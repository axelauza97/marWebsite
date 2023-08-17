from django.db import models


class Trip(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(max_length=500)
    button = models.CharField(max_length=255)
    image = models.ImageField(blank=True, null=True)
    user = models.IntegerField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
