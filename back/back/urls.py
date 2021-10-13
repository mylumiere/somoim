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
from users.views import SignInAPI, UserListAPI, UserAPI, SignedInUserAPI
from somoim.views import MoimListView, MoimView, ArticleListView, ArticleView

urlpatterns = [
    path('users/', include('users.urls')),
    path('admin/', admin.site.urls),
    path('api/', SignedInUserAPI.as_view()),
    path('api/users/sign_in/', SignInAPI.as_view()),
    path('api/users/', UserListAPI.as_view()),
    path('api/users/<str:user_id>/', UserAPI.as_view()),
    path('api/moims/', MoimListView.as_view(), name='moim_list'),
    path('api/moims/<int:id>', MoimView.as_view(), name='moim_detail'),
    path('api/articles/', ArticleListView.as_view(), name='article_list'),
    path('api/articles/<int:id>', ArticleView.as_view(), name='article_detail'),
]
