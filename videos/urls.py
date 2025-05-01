from django.urls import path
from .views import FilmList, popular_movies

urlpatterns = [
    path('films/', FilmList.as_view(), name='Film-list'),
    path('api/movies/popular/', popular_movies, name='popular_movies'),
]

