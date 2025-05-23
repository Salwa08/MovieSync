import logging
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer

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