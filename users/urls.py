from django.urls import path
from .views import register_api, login_api, check_email_existence
from . import views

urlpatterns = [
    path('login/', views.login_api, name='login_api'),
    path('api/register/', register_api, name='api_register'),
    path('api/login/', login_api, name='api_login'),
    path('api/check-email/', check_email_existence, name='check_email_existence'),
]
