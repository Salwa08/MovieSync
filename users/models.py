from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from videos.models import Film

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.URLField(blank=True, null=True, default='http://localhost:3000/assets/default_avatar.png')

    def __str__(self):
        return f"Profile of {self.user.username}"


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, avatar='http://localhost:3000/assets/default_avatar.png')
    else:
        instance.profile.save()

class UserMovieProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film = models.ForeignKey(Film, on_delete=models.CASCADE)
    progress = models.FloatField(default=0)  # 0-100
    last_watched = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'film')

    def __str__(self):
        return f"{self.user.username} - {self.film} ({self.progress}%)"







