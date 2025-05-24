import logging
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer
from videos.models import Film, Favourite
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.conf import settings
from datetime import datetime
from django.utils import timezone
from .models import UserMovieProgress
import os

logger = logging.getLogger(__name__)

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        logger.info("Register API called with data: %s", request.data)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error("Error creating user: %s", str(e))
            return Response({'error': 'Internal server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_api(request):
    username_or_email = request.data.get('username') or request.data.get('email')
    password = request.data.get('password')
    
    logger.info(f"Login attempt with: {username_or_email}")
    
    # First try direct username authentication
    user = authenticate(username=username_or_email, password=password)
    
    # If that fails, try to find a user with matching email
    if user is None:
        try:
            # Look up the user with this email
            user_obj = User.objects.get(email=username_or_email)
            # Then authenticate with their username
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def check_email_existence(request):
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

    email_exists = User.objects.filter(email=email).exists()

    if email_exists:
        return Response({'message': 'A password reset link has been sent to your email.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Email does not exist in our records.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_stats(request):
    user = request.user
    now = timezone.now()
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    # User progress queryset
    progress_qs = UserMovieProgress.objects.filter(user=user)
    movies_watched = progress_qs.filter(progress=100).count()
    movies_this_month = progress_qs.filter(progress=100, last_watched__gte=start_of_month).count()
    # Recently watched: any movie with progress > 0, order by last_watched
    recent_progress = progress_qs.filter(progress__gt=0).order_by('-last_watched')[:5]
    recent_movies = [
        {
            'id': p.film.id,
            'title': getattr(p.film, 'Titre', getattr(p.film, 'title', '')),
            'Poster': getattr(p.film, 'Poster', ''),
            'genre': getattr(p.film, 'Genre', ''),
            'progress': p.progress,
            'last_watched': p.last_watched,
        }
        for p in recent_progress
    ]
    # Favourites (unchanged)
    favourites_qs = Favourite.objects.filter(user=user).select_related('film')
    favourites = [
        {
            'id': fav.film.id,
            'title': getattr(fav.film, 'Titre', getattr(fav.film, 'title', '')),
            'Poster': getattr(fav.film, 'Poster', ''),
            'genre': getattr(fav.film, 'Genre', ''),
        }
        for fav in favourites_qs
    ]
    # Watchlist (placeholder)
    watchlist = []
    avatar = user.profile.avatar if hasattr(user, 'profile') and user.profile.avatar else 'http://localhost:3000/assets/default_avatar.png'
    stats = {
        'name': user.username,
        'email': user.email,
        'movies_watched': movies_watched,
        'movies_this_month': movies_this_month,
        'watch_time': "0h 0m",  # Placeholder
        'subscription': getattr(user, 'subscription', 'Free'),
        'favorites': len(favourites),
        'watchlist': len(watchlist),
        'avatar': avatar,
    }
    return Response({
        'stats': stats,
        'recent_movies': recent_movies,
        'favourites': favourites,
        'watchlist': watchlist,
    }, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_avatar(request):
    user = request.user
    avatar_url = request.data.get('avatar')
    if not avatar_url:
        return Response({'error': 'No avatar provided'}, status=status.HTTP_400_BAD_REQUEST)
    user.profile.avatar = avatar_url if hasattr(user, 'profile') else avatar_url
    user.save()
    return Response({'avatar': avatar_url}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_avatar(request):
    parser_classes = (MultiPartParser, FormParser)
    user = request.user
    avatar_file = request.FILES.get('avatar')
    if not avatar_file:
        return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
    # Save the file
    filename = f"avatars/user_{user.id}_{avatar_file.name}"
    file_path = default_storage.save(filename, avatar_file)
    avatar_url = settings.MEDIA_URL + filename
    # Update profile
    user.profile.avatar = avatar_url
    user.profile.save()
    return Response({'avatar': avatar_url}, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def profile_update(request):
    user = request.user
    name = request.data.get('name')
    email = request.data.get('email')
    updated = False
    if name:
        user.username = name
        updated = True
    if email:
        user.email = email
        updated = True
    if updated:
        user.save()
        return Response({'success': True, 'name': user.username, 'email': user.email}, status=200)
    return Response({'error': 'No data provided'}, status=400)