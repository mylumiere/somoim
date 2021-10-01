from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('agreement/', views.AgreementView.as_view(), name='agreement'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('api/users/', views.UserListAPI.as_view(), name='UserListAPI'),
]
