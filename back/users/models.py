from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, user_id, password, email, name, auth, **extra_fields):
        user = self.model(
            user_id = user_id,
            email = email,
            name = name,
            auth = auth,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, password, email=None, name=None, auth=None):
        user = self.create_user(user_id, password, email, name, auth)
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    
    objects = UserManager()

    user_id = models.CharField(max_length=17, verbose_name="아이디", unique=True)
    password = models.CharField(max_length=256, verbose_name="비밀번호")
    email = models.EmailField(max_length=128, verbose_name="이메일",null=True, unique=True)
    name = models.CharField(max_length=8, verbose_name="이름", null=True)
    auth = models.CharField(max_length=10, verbose_name="인증번호", null=True)
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name='가입일', null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'user_id'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return self.user_id
# Create your models here.
