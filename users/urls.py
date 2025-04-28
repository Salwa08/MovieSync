from django.urls import path
from .views import index, home_page_user,sign_up, user_login, user_logout

urlpatterns = [
    path('', index, name="index"),
    path('home_user/', home_page_user, name="home_user"),
    path("sign_up/", sign_up),
    path("login/", user_login, name="user_login"),
    path("logout/",user_logout, name="user_logout"),

]
