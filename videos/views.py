from rest_framework import generics
from .models import Film
from .serializers import FilmSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Film, Serie
from .serializers import FilmSerializer, SerieSerializer
from django.conf import settings
import requests


class FilmList(generics.ListAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer


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

    if not query:
        return Response({'error': 'Query parameter is required.'}, status=400)

    
    films = Film.objects.filter(title__icontains=query)
    series = Serie.objects.filter(title__icontains=query)
    if genre:
            films = films.filter(genre__icontains=genre)
            series = series.filter(genre__icontains=genre)
    if release_year:
            films = films.filter(release_year=release_year)
            series = series.filter(release_year=release_year)
    if rating:
            films = films.filter(rating__gte=rating)
            series = series.filter(rating__gte=rating)


    film_serializer = FilmSerializer(films, many=True).data
    serie_serializer = SerieSerializer(series, many=True).data

    return Response({
        'films': film_serializer,
        'series': serie_serializer
    }, status=200)


# this view is used to fetch popular movies from TMDB API
# and return them to the frontend
@api_view(['GET'])
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