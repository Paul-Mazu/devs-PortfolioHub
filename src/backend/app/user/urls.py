"""Url mappings for the user API"""

from django.urls import path
from user import api_views

app_name = "user"

urlpatterns = [
    path("create/", api_views.CreateUserView.as_view(), name="create"),
    path("token/", api_views.CreateTokenView.as_view(), name="token"),
    path("me/", api_views.ManageUserView.as_view(), name="me"),
]
