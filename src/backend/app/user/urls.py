"""Url mappings for the user API"""

from django.urls import include, path
from user import api_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("users", api_views.UserViewSet, basename="user")
router.register("tags", api_views.TagViewSet, basename="tag")

app_name = "user"

urlpatterns = [
    path("create/", api_views.CreateUserView.as_view(), name="create"),
    path("token/", api_views.CreateTokenView.as_view(), name="token"),
    path("me/", api_views.ManageUserView.as_view(), name="me"),
    path("", include(router.urls)),
]
