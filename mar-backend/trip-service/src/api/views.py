from django.shortcuts import render
from rest_framework.response import Response

from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status, viewsets
from .models import *
from .serializer import *

from rest_framework.views import exception_handler


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


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]
        return [AllowAny()]
        return super().get_permissions()

    # GET
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response(
            {
                "status": status.HTTP_200_OK,
                "message": "Successful",
                "data": response.data,
            },
            status=status.HTTP_200_OK,
        )

    # POST
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"status": status.HTTP_201_CREATED, "message": "Successful"},
                status=status.HTTP_201_CREATED,
            )
        else:
            default_errors = serializer.errors
            field_names = []
        for field_name, field_errors in default_errors.items():
            field_names.append(field_name)
        return Response(
            {
                "status": status.HTTP_400_BAD_REQUEST,
                "message": f"Invalid data in {field_names}",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    # PATCH
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response(
            {
                "status": status.HTTP_200_OK,
                "message": "Successful",
                "data": response.data,
            },
            status=status.HTTP_200_OK,
        )

    # DELETE
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        return Response(
            {
                "status": status.HTTP_200_OK,
                "message": "Successful",
            },
            status=status.HTTP_200_OK,
        )
