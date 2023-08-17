from django.shortcuts import render
from rest_framework.response import Response

from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import *
from .serializer import *

from rest_framework.views import exception_handler
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import TokenAuthentication


class CustomTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        user, token = super().authenticate_credentials(key)
        if not user:
            raise AuthenticationFailed(
                "Custom message: User not found for the provided token."
            )
        return user, token


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    print(response)
    print(response.status_code)
    print(response.data)
    if response.status_code == status.HTTP_400_BAD_REQUEST:
        message = response.data.get("email")[0]
    elif response.status_code == status.HTTP_401_UNAUTHORIZED:
        message = "Authentication credentials were not provided or invalid"
    else:
        message = "Error"
    return Response(
        {
            "status": response.status_code,
            "message": message,
        },
        status=response.status_code,
    )


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
                "status": status.HTTP_201_CREATED,
                "message": "Successful",
                "data": {
                    "pk": user.pk,
                    "refresh": str(token),
                    "access": str(token.access_token),
                },
            },
            status=status.HTTP_201_CREATED,
        )


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        print(response)
        return Response(
            {
                "status": status.HTTP_200_OK,
                "message": "Successful",
                "data": response.data,
            },
            status=status.HTTP_200_OK,
        )
