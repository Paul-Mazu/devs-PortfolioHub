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


    def perform_create(self, serializer):
        """Create new project"""
        serializer.save(author=self.request.user)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for listing or retrieving projects."""

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
