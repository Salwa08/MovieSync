from rest_framework import generics
from .models import Film
from .serializers import FilmSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Film
from .serializers import FilmSerializer



class FilmList(generics.ListAPIView):
    queryset = Film.objects.all()
    serializer_class = FilmSerializer


@api_view(['GET'])
def popular_movies(request):
    movies = Film.objects.filter(is_popular=True)
    serializer = FilmSerializer(movies, many=True)
    return Response(serializer.data)

