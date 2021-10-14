from rest_framework import serializers
from .models import User
from somoim.serializers import MoimSerializer, ArticleSerializer

class UserSerializer(serializers.ModelSerializer) :
    leader_moim = MoimSerializer(many=True)
    member_moim = MoimSerializer(many=True)

    class Meta :
        model = User
        fields = '__all__'
