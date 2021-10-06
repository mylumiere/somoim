from django.shortcuts import render
from django.http import HttpResponse
from .models import Article

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import ArticleSerializer

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
