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

from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer

class SignUpView(View):
    def post(self, request):
        data = json.loads(request.body)
        User(
            user_id = data['user_id'],
            password = data['password'],
            email = data['email'],
            name = data['name'],
            nickname = data['nickname'],
            date_of_birth = data['date_of_birth'],
            about = data['about']
        )
        return HttpResponse(status=200)

class UserListAPI(APIView):
    def get(self, request):
        queryset = User.objects.all()
        print(queryset)
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        data = request.data
        #user = User.objects.filter(email=data['email']).first()
        user_id = data['user_id']
        password = data['password']
        #password = data['password'].encode('utf-8')
        #password_crypt = bcrypt.hashpw(password, bcrypt.gensalt())
        #password_crypt = password_crypt.decode('utf-8')
        date_of_birth = data['date_of_birth']
        date_of_birth = datetime.strptime(date_of_birth,'%Y-%m-%dT%H:%M:%S.%fZ')
        utc = date_of_birth.replace(tzinfo=pytz.UTC)
        date_of_birth = utc.astimezone(timezone.get_current_timezone()).date()
        user = User(
            user_id = user_id,
            password = password,
            email = data['email'],
            name = data['name'],
            #nickname = data['nickname'],
            date_of_birth = date_of_birth,
            #about = data['about']
        )
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data,status=200)

# Create your views here.
