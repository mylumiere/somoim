from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, user_id, password, email, name, nickname, date_of_birth, about, photo):
        user = self.model(
            user_id = user_id,
            email = email,
            name = name,
            nickname = nickname,
            date_of_birth = date_of_birth,
            about = about,
            photo = photo
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, password, email):
        user = self.create_user(user_id, password, email, 'admin', 'admin', '1900-01-01', '', '')
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    
    objects = UserManager()

    user_id = models.CharField(max_length=17, verbose_name="아이디", unique=True, primary_key=True)
    password = models.CharField(max_length=256, verbose_name="비밀번호")
    email = models.EmailField(max_length=128, verbose_name="이메일", null=True, unique=True)
    name = models.CharField(max_length=8, verbose_name="이름", null=True)
    nickname = models.CharField(max_length=16, verbose_name="닉네임", null=True)
    date_of_birth = models.DateField(verbose_name="생년월일", null=True)
    about = models.TextField(max_length=200, verbose_name="한마디", null=True)
    date_joined = models.DateTimeField(auto_now_add=True, null=True, verbose_name="가입일")
    photo = models.ImageField(upload_to="users", null=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return self.user_id
# Create your models here.
