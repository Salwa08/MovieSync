from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .decorators import unauthenticated_user, allowed_users
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from .form import SignUpForm
from django.contrib import messages
from .models import *

def user_login(request):
    username = request.session.pop('temp_username', '')
    password = request.session.pop('temp_password', '')
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request,user)
            return redirect('home_user')
        else :
            messages.info(request, 'username or password is incorrect')

    return render(request, 'users/user_login.html', {'username': username, 'password': password})


@unauthenticated_user
def sign_up(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')

            group = Group.objects.get(name='users')
            user.groups.add(group)

            # using sessions to store the user info
            request.session['temp_username'] = username
            request.session['temp_password'] = password
            return redirect('user_login')
    else:
        form = SignUpForm()
    return render(request, 'users/sign_up.html', locals())

def user_logout(request):
    logout(request)
    return redirect('user_login')

@unauthenticated_user
def index(request):
    return render(request, 'index.html')

@login_required(login_url='login')
@allowed_users(allowed_roles=['admin'])
def home_page_admin(request):
    return render(request,'users/home_page_admin.html')


######## HomePage for users (logged in )
def home_page_user(request):
    return render(request,'users/home_page_user.html')


@login_required(login_url='login')
def home_user(request):
    films = Film.objects.all()
    return render(request,'users/home_page_user.html',{'films':films})