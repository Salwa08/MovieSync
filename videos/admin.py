from django.contrib import admin
from .models import  Film, Serie, Season, Episode, Director, Actor

admin.site.register(Film)
admin.site.register(Serie)
admin.site.register(Season)
admin.site.register(Episode)
admin.site.register(Director)
admin.site.register(Actor)
