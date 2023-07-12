from .models import *
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ( 'username', 'password')
    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        return super().create(validated_data)