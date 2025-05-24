from django.urls import path
from .views import RegisterAPI, login_api, check_email_existence
from . import views

urlpatterns = [
    path('login/', views.login_api, name='login_api'),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', login_api, name='api_login'),
    path('api/check-email/', check_email_existence, name='check_email_existence'),
    path('api/profile-stats/', views.profile_stats, name='profile_stats'),
    path('api/update-avatar/', views.update_avatar, name='update_avatar'),
    path('api/upload-avatar/', views.upload_avatar, name='upload_avatar'),
    path('api/profile-update/', views.profile_update, name='profile_update'),
]
