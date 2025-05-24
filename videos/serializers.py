from rest_framework import serializers
from .models import Film, Actor, Director
from .models import Film, Serie
from .models import Favourite
from .models import Review


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class FilmSerializer(serializers.ModelSerializer):
    Actors = ActorSerializer(many=True, read_only=True)
    Director = DirectorSerializer(read_only=True)

    class Meta:
        model = Film
        fields = '__all__'

class SerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Serie
        fields = '__all__'

class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ['id', 'user', 'film', 'added_at']

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'user', 'rating', 'comment', 'created_at']

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "username": obj.user.username,
        }





