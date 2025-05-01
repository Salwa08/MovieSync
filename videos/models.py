from django.db import models

TYPES_CHOICES = [
    ('movie', 'Movie'),
    ('documentary', 'Documentary'),
    ('kids', 'Kids'),
    ('series', 'Series'),
    ('anime', 'Anime'),
    ('short', 'Short Film'),
    ('tv_show', 'TV Show'),
]

GENRES_CHOICES = [
    ('action', 'Action'),
    ('adventure', 'Adventure'),
    ('comedy', 'Comedy'),
    ('crime', 'Crime'),
    ('drama', 'Drama'),
    ('fantasy', 'Fantasy'),
    ('historical', 'Historical'),
    ('horror', 'Horror'),
    ('mystery', 'Mystery'),
    ('romance', 'Romance'),
    ('sci-fi', 'Sci-Fi'),
    ('thriller', 'Thriller'),
    ('western', 'Western'),
    ('animation', 'Animation'),
    ('documentary', 'Documentary'),
    ('biography', 'Biography'),
]

CATEGORY_CHOICES = [
    ('popular', 'Popular'),
    ('fantasy', 'Fantasy'),
    ('action', 'Action'),
    ('thriller', 'Thriller'),
    ('new_releases', 'New Releases'),
    ('just_for_you', 'Just For You'),
    ('trending_now', 'Trending Now'),
]

class Content(models.Model) :
    Titre = models.CharField(max_length=100)
    Description = models.CharField(max_length=300)
    Genre = models.JSONField(default=list, blank=True, null=True)
    Imdb = models.FloatField(max_length=12)
    Director =  models.ForeignKey("Director", on_delete=models.CASCADE)
    Trailer = models.URLField(null=True, blank=True)
    Poster = models.URLField(null=True, blank=True)
    Actors = models.ManyToManyField("Actor", blank=True)
    is_popular = models.BooleanField(default=False)

    def __str__(self):
        return self.Titre


    class Meta:
        abstract = True

class Film(Content) :
    type = models.CharField(max_length=20, choices=TYPES_CHOICES, default='movie')
    Video = models.URLField(null=True,blank=True)
    Duration = models.IntegerField()
    ReleaseDate = models.DateField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='popular')


#Documentares and kids will be stock with film or movies

class Serie(Content) :
    type = models.CharField(max_length=20, choices=TYPES_CHOICES, default='series')
    Nb_season = models.IntegerField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='popular')


class Season(models.Model):
    Serie = models.ForeignKey("Serie", on_delete=models.CASCADE)
    N_season = models.IntegerField()
    ReleaseDate = models.DateField(null=True, blank=True)
    Nb_episode = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.Serie.Titre}_S{self.N_season}"


class Episode(models.Model):
    Season = models.ForeignKey("Season", on_delete=models.CASCADE)
    Nb_episode = models.IntegerField()
    Video = models.URLField(null=True,blank=True)

    def __str__(self):
        return f"{self.Season.Serie.Titre}_S{self.Season.N_season}_E{self.Nb_episode}"




class Director(models.Model):
    Name = models.CharField(max_length=100)
    Img = models.URLField()

    def __str__(self):
        return self.Name

class Actor(models.Model):
    Name = models.CharField(max_length=100)
    Img = models.URLField()

    def __str__(self):
        return self.Name

