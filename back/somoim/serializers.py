from rest_framework import serializers
from .models import Moim, Article

class ScheduleSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Article
        fields = '__all__'

class MoimSerializer(serializers.ModelSerializer) :
    schedules = ScheduleSerializer(many=True)
    class Meta :
        model = Moim
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Article
        fields = '__all__'
