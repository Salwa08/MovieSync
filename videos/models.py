from django.db import models

TYPES_CHOICES = [
    ('movie', 'Movie'),
    ('documentary', 'Documentary'),
    ('kids', 'Kids'),
    ('series', 'Series'),
    ('anime', 'Anime'),
    ('short', 'Short Film'),
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

    def __str__(self):
        return self.Titre


    class Meta:
        abstract = True

class Film(Content) :
    type = models.CharField(max_length=20, choices=TYPES_CHOICES, default='movie')
    Video = models.URLField(null=True,blank=True)
    Duration = models.IntegerField()
    ReleaseDate = models.DateField()


#Documentares and kids will be stock with film or movies

class Serie(Content) :
    type = models.CharField(max_length=20, choices=TYPES_CHOICES, default='series')
    Nb_season = models.IntegerField()


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

