# Generated by Django 3.2.7 on 2021-10-02 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_user_student_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='auth',
        ),
        migrations.AddField(
            model_name='user',
            name='about',
            field=models.TextField(max_length=200, null=True, verbose_name='한마디'),
        ),
        migrations.AddField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(null=True, verbose_name='생년월일'),
        ),
        migrations.AddField(
            model_name='user',
            name='nickname',
            field=models.CharField(max_length=16, null=True, verbose_name='닉네임'),
        ),
    ]