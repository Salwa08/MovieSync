from django.urls import path
from .views import FilmList

urlpatterns = [
    path('films/', FilmList.as_view(), name='Film-list'),
]
