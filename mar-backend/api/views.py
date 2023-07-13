from django.shortcuts import render
from rest_framework.response import Response

from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import *
from .serializer import *
# Create your views here.
class CreateUser(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.filter(is_superuser=False)
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        print(token)
        return Response(
            {
                "data": serializer.data,
                "refresh": str(token), 
                "access": str(token.access_token)
                
            }, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
class CreateTrip(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class GetTrip(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class ListTrip(generics.ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class DeleteTrip(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

class UpdateTrip(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Trip.objects.all()
    serializer_class = TripSerializer