from rest_framework import generics
from .models import Film
from .serializers import FilmSerializer
from django.shortcuts import render


class FilmList(generics.ListAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer


