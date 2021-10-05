"""back URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from users.views import SignInAPI, UserListAPI, UserAPI
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('users/', include('users.urls')),
    path('board/', include('board.urls')),
    path('admin/', admin.site.urls),
    path('api/users/sign_in/', SignInAPI.as_view()),
    path('api/users/', UserListAPI.as_view()),
    path('api/users/<int:id>/', UserAPI.as_view()),
    path('api/token/', obtain_jwt_token),
]
