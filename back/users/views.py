import json
import bcrypt
from datetime import datetime
import pytz
from django.utils import timezone

from django.shortcuts import render, redirect
from django.utils.decorators import method_decorator
from django.views import View
from django.http import JsonResponse
from django.contrib import auth
from django.contrib.auth import login, authenticate
from .decorators import *
from .models import User

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.settings import api_settings
from rest_framework import permissions
from .serializers import UserSerializer

from rest_framework.decorators import api_view, renderer_classes

class SignInAPI(APIView):
    permission_classes = (permissions.AllowAny,)
    #@api_view(['POST'])
    def post(self, request):
        data = json.loads(request.body)
        user_id = data['user_id']
        pw = data['password']
        user = authenticate(username=user_id, password=pw)
        print(user)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token':token.key, 'id':user.id}, status=200)
        else:
            return HttpResponse(status=401)

class UserListAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = User.objects.all()
        print(queryset)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data
        user_id = data['user_id']
        password = data['password']
        date_of_birth = data['date_of_birth']
        date_of_birth = datetime.strptime(date_of_birth,'%Y-%m-%dT%H:%M:%S.%fZ')
        utc = date_of_birth.replace(tzinfo=pytz.UTC)
        date_of_birth = utc.astimezone(timezone.get_current_timezone()).date()
        user = User(
            user_id = user_id,
            email = data['email'],
            name = data['name'],
            date_of_birth = date_of_birth,
        )
        user.set_password(password)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data,status=200)

class UserAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, id):
        print(request)
        user = User.objects.get(id=id)
        print(user)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Create your views here.
