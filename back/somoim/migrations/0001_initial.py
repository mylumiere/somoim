# Generated by Django 3.2.7 on 2021-10-09 07:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Moim',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='제목')),
                ('content', models.TextField(verbose_name='내용')),
                ('province', models.CharField(max_length=16, verbose_name='시도')),
                ('city', models.CharField(max_length=16, verbose_name='시군구')),
                ('registered_date', models.DateTimeField(auto_now_add=True, verbose_name='등록시간')),
                ('leader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='leader_moim', to=settings.AUTH_USER_MODEL, verbose_name='리더')),
                ('members', models.ManyToManyField(null=True, related_name='member_moim', to=settings.AUTH_USER_MODEL, verbose_name='멤버')),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128, verbose_name='제목')),
                ('content', models.TextField(verbose_name='내용')),
                ('hits', models.PositiveIntegerField(default=0, verbose_name='조회수')),
                ('registered_date', models.DateTimeField(auto_now_add=True, verbose_name='등록시간')),
                ('moim', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='somoim.moim', verbose_name='모임')),
                ('writer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='작성자')),
            ],
        ),
    ]