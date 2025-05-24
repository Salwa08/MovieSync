from django.urls import path
from .views import FilmList, popular_movies, search_content, get_popular_movies, list_favourites, add_favourite, remove_favourite, FilmDetail

urlpatterns = [
    path('films/', FilmList.as_view(), name='Film-list'),
    path('api/movies/popular/', popular_movies, name='popular_movies'),
    path('search/', search_content, name='search_content'),
    path('get-movies/', get_popular_movies, name='get_popular_movies'),
    path('favourites/', list_favourites, name='list_favourites'),
    path('favourites/add/', add_favourite, name='add_favourite'),
    path('favourites/remove/<int:film_id>/', remove_favourite, name='remove_favourite'),
    path('film/<int:id>/', FilmDetail.as_view(), name='Film-detail'),
]

