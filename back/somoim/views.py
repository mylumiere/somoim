from django.shortcuts import render
from django.http import HttpResponse
from .models import Moim, Article, Schedule

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import MoimSerializer, ArticleSerializer


class MoimListView(APIView):
    permissions_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        queryset = Moim.objects.all()
        print(queryset)
        serializer = MoimSerializer(queryset, many=True)
        return Response(serializer.data)

class MoimView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id):
        moim = Moim.objects.get(id=id)
        serializer = MoimSerializer(moim)
        return Response(serializer.data)


class ScheduleListView(APIView):
    permissions_classes = (permissions.IsAuthenticated,)
    def get(self, request, id):
        queryset = Schedule.objects.filter(moim=Moim.objects.get(id=id))
        print(queryset)
        serializer = MoimSerializer(queryset, many=True)
        return Response(serializer.data)

class ScheduleView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id, s_id):
        schedule = Schedule.objects.get(id=s_id)
        serializer = MoimSerializer(schedule)
        return Response(serializer.data)


class ArticleListView(APIView):
    permissions_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        queryset = Article.objects.all()
        print(queryset)
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data)

class ArticleView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, id):
        article = Article.objects.get(id=id)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    def put(self, request, id):
        data = request.data
        article = Article.objects.get(id=id)
        article.title = data['title']
        article.content = data['content']
        article.save()
        serializer = ArticleSerializer(article)
        return Response(serializer.data,status=200)
