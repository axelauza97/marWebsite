# Use include() to add paths from the appVehicular
from .views import *
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from django.conf.urls import url, handler404

from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"trips", TripViewSet, basename="trips")


urlpatterns = [
    url(r"", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
