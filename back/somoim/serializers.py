from rest_framework import serializers
from .models import Moim, Article

class MoimSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Moim
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Article
        fields = '__all__'
