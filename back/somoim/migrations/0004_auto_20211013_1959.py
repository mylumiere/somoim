# Generated by Django 3.2.7 on 2021-10-13 10:59

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('somoim', '0003_alter_moim_members'),
    ]

    operations = [
        migrations.AddField(
            model_name='moim',
            name='closed',
            field=models.BooleanField(default=False, verbose_name='마감'),
        ),
        migrations.AddField(
            model_name='moim',
            name='max_members',
            field=models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(50), django.core.validators.MinValueValidator(1)], verbose_name='총 인원'),
        ),
    ]