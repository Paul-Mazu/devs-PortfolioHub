"""Url mappings for the project API"""

from django.urls import path
from project import api_views

app_name = "project"

urlpatterns = [
    path("projects/", api_views.ProjectList.as_view(), name = "projects/"),
    path("projects/<int:pk>", api_views.ProjectDetail.as_view(), name="project-detail"),
]
