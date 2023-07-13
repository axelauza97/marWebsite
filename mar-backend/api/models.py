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

class Trip(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(max_length=500)
    button = models.CharField(max_length=255)
    image = models.ImageField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
