# from rest_framework import generics, permissions
# from rest_framework import authentication
# from .models import Project, Tag
# from user.models import User
# from .serializers import ProjectSerializer


# class ProjectList(generics.ListCreateAPIView):
#     """Create a new Project or List all Projects"""

#     queryset = Project.objects.all()
#     serializer_class = ProjectSerializer

#     def perform_create(self, serializer):
#         """Adding author and tags at creation of new project"""
#         author_data = serializer.validated_data.get("author")
#         tag_data = serializer.validated_data.get("tag", [])
#         author = User.objects.create_user(**author_data)
#         project = serializer.save(author=author)
#         for tag_item in tag_data:
#             tag, _ = Tag.objects.get_or_create(name=tag_item["name"])
#             project.tag.add(tag)


# class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
#     """Retrieve/Update/Delete Specific Project"""

#     queryset = Project.objects.all()
#     serializer_class = ProjectSerializer

################################# Pawels Version ################################

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

from .serializers import ProjectSerializer
from .models import Project


class ProjectViewSetAuth(viewsets.ModelViewSet):
    """View for manage project APIs."""

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    http_method_names = ["put", "post", "patch", "head"]
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for listing or retrieving projects."""

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
