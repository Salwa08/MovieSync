from django.urls import path
from .views import FilmList, popular_movies, search_content, get_popular_movies

urlpatterns = [
    path('films/', FilmList.as_view(), name='Film-list'),
    path('api/movies/popular/', popular_movies, name='popular_movies'),
    path('search/', search_content, name='search_content'),
    path('get-movies/', get_popular_movies, name='get_popular_movies'),
    
]

