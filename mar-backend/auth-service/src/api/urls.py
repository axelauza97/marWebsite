# Use include() to add paths from the appVehicular
from .views import *
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from django.conf.urls import url, handler404

from rest_framework_simplejwt import views as jwt_views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'trips',TripViewSet,basename='trips')


    
urlpatterns = [
    url(r'',include(router.urls)),
    url(r'user/create/$',CreateUser.as_view()),
    #url(r'token/obtain/$', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    url(r'token/refresh/$', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    url(r'login/$', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

    url(r'trip/$', ListTrip.as_view()),
    url(r'trip/(?P<pk>[0-9]+)/$', GetTrip.as_view()),
    url(r'trip/create/$', CreateTrip.as_view()),
    url(r'trip/update/(?P<pk>[0-9]+)/$', UpdateTrip.as_view()),
    url(r'trip/delete/(?P<pk>[0-9]+)/$', DeleteTrip.as_view())

        

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
