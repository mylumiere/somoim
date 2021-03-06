# Generated by Django 3.2.7 on 2021-10-13 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128, verbose_name='제목')),
                ('content', models.TextField(verbose_name='내용')),
                ('hits', models.PositiveIntegerField(default=0, verbose_name='조회수')),
                ('registered_date', models.DateTimeField(auto_now_add=True, verbose_name='등록시간')),
            ],
        ),
        migrations.CreateModel(
            name='Moim',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='제목')),
                ('content', models.TextField(verbose_name='내용')),
                ('province', models.CharField(max_length=16, verbose_name='시도')),
                ('city', models.CharField(max_length=16, verbose_name='시군구')),
                ('registered_date', models.DateTimeField(auto_now_add=True, verbose_name='등록시간')),
            ],
        ),
    ]
