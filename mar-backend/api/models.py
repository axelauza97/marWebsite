from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
     username = models.EmailField(max_length=255, unique=True)
     email = None
     USERNAME_FIELD = 'username'
     REQUIRED_FIELDS = []
     def __str__(self):
        return '%s: %s' % (self.id, self.username)
