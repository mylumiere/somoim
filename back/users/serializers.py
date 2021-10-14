from rest_framework import serializers
from .models import User
from somoim.serializers import MoimSerializer, ArticleSerializer

class UserSerializer(serializers.ModelSerializer) :
    leader_moims = MoimSerializer(many=True)
    member_moims = MoimSerializer(many=True)
    articles = ArticleSerializer(many=True)

    class Meta :
        model = User
        fields = '__all__'
