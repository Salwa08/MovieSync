from rest_framework import generics, permissions, status
from .models import Film, Serie, Favourite, Review, Actor
from .serializers import FilmSerializer, SerieSerializer, FavouriteSerializer, ReviewSerializer, ActorSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.conf import settings
import requests
from rest_framework.generics import RetrieveAPIView


class FilmList(generics.ListAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    pagination_class = None


class SerieList(generics.ListAPIView):
    queryset = Serie.objects.all()
    serializer_class = SerieSerializer


@api_view(['GET'])
def popular_movies(request):
    movies = Film.objects.filter(is_popular=True)
    serializer = FilmSerializer(movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def search_content(request):
    query = request.GET.get('query', '')
    genre = request.GET.get('genre', None)
    release_year = request.GET.get('release_year', None)
    rating = request.GET.get('rating', None)

    # Only return error if ALL filters are empty
    if not (query or genre or release_year or rating):
        return Response({'error': 'At least one search parameter is required.'}, status=400)

    films = Film.objects.all()
    series = Serie.objects.all()
    if query:
        films = films.filter(Titre__icontains=query)
        series = series.filter(Titre__icontains=query)
    if genre:
        films = films.filter(Genre__icontains=genre)
        series = series.filter(Genre__icontains=genre)
    if release_year:
        films = films.filter(ReleaseDate__startswith=release_year)
        
    if rating:
        films = films.filter(Imdb__gte=rating)
        series = series.filter(Imdb__gte=rating)


    film_serializer = FilmSerializer(films, many=True).data
    serie_serializer = SerieSerializer(series, many=True).data

    return Response({
        'films': film_serializer,
        'series': serie_serializer
    }, status=200)


# this view is used to fetch popular movies from TMDB API
# and return them to the frontend
@api_view(["GET"])
def get_popular_movies(request):
    api_key = "d0d4b33791fab1f5e75924ccb1f14603"  
    base_url = "https://api.themoviedb.org/3/movie/popular"
    all_movies = []

    try:
        for page in range(1, 6):  # Fetch up to 5 pages (100 movies, 20 per page)
            response = requests.get(
                f"{base_url}?api_key={api_key}&language=en-US&page={page}"
            )
            if response.status_code == 200:
                data = response.json()
                all_movies.extend(data.get("results", []))
            else:
                break

        return Response(all_movies)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def list_favourites(request):
    favourites = Favourite.objects.filter(user=request.user)
    serializer = FavouriteSerializer(favourites, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_favourite(request):
    film_id = request.data.get('film')
    if not film_id:
        return Response({'error': 'film id required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        film = Film.objects.get(id=film_id)
    except Film.DoesNotExist:
        return Response({'error': 'Film not found'}, status=status.HTTP_404_NOT_FOUND)
    fav, created = Favourite.objects.get_or_create(user=request.user, film=film)
    serializer = FavouriteSerializer(fav)
    return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def remove_favourite(request, film_id):
    try:
        fav = Favourite.objects.get(user=request.user, film_id=film_id)
        fav.delete()
        return Response({'success': True})
    except Favourite.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

class FilmDetail(generics.RetrieveAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    lookup_field = 'id'

class FilmReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        film_id = self.kwargs['film_id']
        return Review.objects.filter(film_id=film_id).order_by('-created_at')

    def perform_create(self, serializer):
        film = Film.objects.get(pk=self.kwargs['film_id'])
        serializer.save(user=self.request.user, film=film, serie=None)

class ReviewDeleteView(generics.DestroyAPIView):
    queryset = Review.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ReviewSerializer

    def get_queryset(self):
        # Only allow users to delete their own reviews
        return Review.objects.filter(user=self.request.user)


@api_view(['GET'])
def movie_recommendations(request, film_id):
    try:
        movie = Film.objects.get(pk=film_id)
        genres = movie.Genre if movie.Genre else []
        print("Genres for movie:", genres)
        
        # Get all other films
        all_films = Film.objects.exclude(id=film_id)
        
        # Manual comparison for matching genres
        recommendations = []
        for film in all_films:
            film_genres = film.Genre if film.Genre else []
            # Check if any genre matches (case insensitive)
            if any(g.lower() in [x.lower() for x in film_genres] for g in genres):
                recommendations.append(film)
        
        recommendations = recommendations[:30]  
        print("Recommendations:", [f.Titre for f in recommendations])
        
        serializer = FilmSerializer(recommendations, many=True)
        return Response(serializer.data)
    except Film.DoesNotExist:
        return Response({'error': 'Movie not found'}, status=404)

class FilmDetail(generics.RetrieveAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer
    lookup_url_kwarg = 'film_id'

class SerieDetail(generics.RetrieveAPIView):
    queryset = Serie.objects.all()
    serializer_class = SerieSerializer
    lookup_url_kwarg = 'serie_id'

class ActorList(generics.ListAPIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
    pagination_class = None  # Disable pagination for this endpoint

class SerieReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        serie_id = self.kwargs['serie_id']
        return Review.objects.filter(serie_id=serie_id).order_by('-created_at')

    def perform_create(self, serializer):
        serie = Serie.objects.get(pk=self.kwargs['serie_id'])
        serializer.save(user=self.request.user, serie=serie, film=None)



