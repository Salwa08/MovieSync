from django.contrib import admin
from .models import Film, Serie, Season, Episode, Director, Actor





class MovieAdmin(admin.ModelAdmin):
    list_display = ('Titre', 'Imdb', 'is_popular')  # Corrected field names
    list_filter = ('is_popular',)
    search_fields = ('Titre',)


class SerieAdmin(admin.ModelAdmin):
    list_display = ('Titre', 'Imdb', 'is_popular')  # Corrected field names
    list_filter = ('is_popular',)
    search_fields = ('Titre',)


class SeasonAdmin(admin.ModelAdmin):
    list_display = ('Serie', 'N_season', 'ReleaseDate')  # Corrected field names
    list_filter = ('Serie',)
    search_fields = ('Serie__Titre',)


class EpisodeAdmin(admin.ModelAdmin):
    list_display = ('Season', 'Nb_episode', 'Video')  # Corrected field names
    list_filter = ('Season',)
    search_fields = ('Season__Serie__Titre', 'Season__N_season')


class DirectorAdmin(admin.ModelAdmin):
    list_display = ('Name',)  # Corrected field name
    search_fields = ('Name',)


class ActorAdmin(admin.ModelAdmin):
    list_display = ('Name',)  # Corrected field name
    search_fields = ('Name',)


admin.site.register(Film, MovieAdmin)
admin.site.register(Serie, SerieAdmin)
admin.site.register(Season, SeasonAdmin)
admin.site.register(Episode, EpisodeAdmin)
admin.site.register(Director, DirectorAdmin)
admin.site.register(Actor, ActorAdmin)



