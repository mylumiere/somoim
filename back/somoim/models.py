from django.conf import settings
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Moim(models.Model):
    leader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='리더', related_name='leader_moim')
    name = models.CharField(max_length=128, verbose_name='제목')
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, null=True, verbose_name='멤버', related_name='member_moim')
    max_members = models.IntegerField(default=1, validators=[MaxValueValidator(50), MinValueValidator(1)], verbose_name='총 인원')
    content = models.TextField(verbose_name='내용')
    registered_date = models.DateTimeField(auto_now_add=True, verbose_name='등록시간')

    def __str__(self):
        return self.name


class Schedule(models.Model):
    title = models.CharField(max_length=128, verbose_name='제목')
    moim = models.ForeignKey(Moim, on_delete=models.CASCADE, verbose_name='모임')
    location = models.CharField(max_length=64, verbose_name='장소')
    datetime = models.DateTimeField(auto_now_add=True, verbose_name='시간')
    content = models.TextField(verbose_name='내용')

    def __str__(self):
        return self.title


class Article(models.Model):
    writer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, verbose_name='작성자')
    title = models.CharField(max_length=128, verbose_name='제목')
    content = models.TextField(verbose_name='내용')
    hits = models.PositiveIntegerField(default=0, verbose_name='조회수')
    registered_date = models.DateTimeField(auto_now_add=True, verbose_name='등록시간')

    def __str__(self):
        return self.title

