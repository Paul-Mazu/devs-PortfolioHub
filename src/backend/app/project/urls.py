"""Url mappings for the project API"""

# from django.urls import path
# from project import api_views

# app_name = "project"

# urlpatterns = [
#     path("projects/", api_views.ProjectList.as_view(), name="projects/"),
#     path(
#         "projects/<int:pk>",
#         api_views.ProjectDetail.as_view(),
#         name="project-detail",
#     ),
# ]

########################### Pawels Solution ######################## noqa
from django.urls import path, include
from project import api_views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("my-projects", api_views.ProjectViewSetAuth, basename="my-projects")
router.register("projects", api_views.ProjectViewSet, basename="projects")
router.register("my-comments", api_views.CommentViewSetAuth, basename="my-comments")
router.register("comments", api_views.CommentViewSet, basename="comments")

app_name = "project"

urlpatterns = [
    path("", include(router.urls)),
]

