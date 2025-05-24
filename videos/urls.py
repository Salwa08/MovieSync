from django.urls import path
from .views import FilmList, FilmDetail, popular_movies, search_content, get_popular_movies, list_favourites, add_favourite, remove_favourite, FilmReviewListCreateView, ReviewDeleteView, movie_recommendations

urlpatterns = [
    path('films/', FilmList.as_view(), name='Film-list'),
    path('films/<int:film_id>/', FilmDetail.as_view(), name='film-detail'),  # Add this line
    path('api/movies/popular/', popular_movies, name='popular_movies'),
    path('search/', search_content, name='search_content'),
    path('get-movies/', get_popular_movies, name='get_popular_movies'),
    path('favourites/', list_favourites, name='list_favourites'),
    path('favourites/add/', add_favourite, name='add_favourite'),
    path('favourites/remove/<int:film_id>/', remove_favourite, name='remove_favourite'),
    path('films/<int:film_id>/reviews/', FilmReviewListCreateView.as_view(), name='film-reviews'),
    path('reviews/<int:pk>/', ReviewDeleteView.as_view(), name='review-delete'),
    path('films/<int:film_id>/recommendations/', movie_recommendations, name='movie-recommendations'),
]

