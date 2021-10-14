import json
from datetime import datetime
import pytz
from django.utils import timezone

from django.contrib.auth import authenticate
from .decorators import *
from .models import User

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import UserSerializer

class SignedInUserAPI(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        user = request.user
        if user:
            return Response({'user_id':user.user_id}, status=200)
        else:
            return HttpResponse(status=404)

class SignInAPI(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        data = json.loads(request.body)
        user_id = data['user_id']
        pw = data['password']
        user = authenticate(username=user_id, password=pw)
        print(user)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token':token.key, 'user_id':user.user_id}, status=200)
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
        name = data['name']
        date_of_birth = data['date_of_birth']
        date_of_birth = datetime.strptime(date_of_birth,'%Y-%m-%dT%H:%M:%S.%fZ')
        utc = date_of_birth.replace(tzinfo=pytz.UTC)
        date_of_birth = utc.astimezone(timezone.get_current_timezone()).date()
        user = User(
            user_id = user_id,
            email = data['email'],
            name = name,
            nickname = name,
            date_of_birth = date_of_birth,
            photo = data['photo'],
        )
        user.set_password(password)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data,status=200)

class UserAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, user_id):
        user = User.objects.get(user_id=user_id)
        print(user)
        serializer = UserSerializer(user)
        return Response(serializer.data)
