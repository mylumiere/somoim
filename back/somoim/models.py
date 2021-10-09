from django.conf import settings
from django.db import models

class Moim(models.Model):
    leader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, verbose_name='리더', related_name='leader_moim')
    name = models.CharField(max_length=128, verbose_name='제목')
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, verbose_name='멤버', related_name='member_moim')
    content = models.TextField(verbose_name='내용')
    province = models.CharField(max_length=16, verbose_name='시도')
    city = models.CharField(max_length=16, verbose_name='시군구')
    registered_date = models.DateTimeField(auto_now_add=True, verbose_name='등록시간')

    def __str__(self):
        return self.name

class Article(models.Model):
    writer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, verbose_name='작성자')
    title = models.CharField(max_length=128, verbose_name='제목')
    moim = models.ForeignKey(Moim, on_delete=models.SET_NULL, null=True, verbose_name='모임')
    content = models.TextField(verbose_name='내용')
    hits = models.PositiveIntegerField(verbose_name='조회수', default=0)
    registered_date = models.DateTimeField(auto_now_add=True, verbose_name='등록시간')

    def __str__(self):
        return self.title

