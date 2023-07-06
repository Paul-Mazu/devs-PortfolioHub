from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import viewsets, status
from rest_framework.response import Response

from .serializers import ProjectSerializer, CommentSerializer
from .models import Project, Comment
from .filters import ProjectFilter, CommentFilter


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



class CommentViewSetAuth(viewsets.ModelViewSet):
    """ViewSet for managing Comments."""

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    http_method_names = ["post", "patch", "delete"]
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Create new comment"""
        author = self.request.user
        if author.is_authenticated:
            serializer.save(author=author)
        else:
            return Response(
                {"error": "You must be authenticated to create a comment."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    def update(self, request, *args, **kwargs):
        """Update a comment"""
        partial = kwargs.pop("partial", False)
        instance = self.get_object()

        if instance.author != self.request.user:
            return Response(
                {"error": "You are not allowed to update this comment."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = self.get_serializer(
            instance, data=request.data, partial=partial
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """Delete a comment"""
        instance = self.get_object()

        if instance.author != self.request.user:
            return Response(
                {"error": "You are not allowed to delete this comment."},
                status=status.HTTP_403_FORBIDDEN,
            )

        self.perform_destroy(instance)

        return Response(
            {"message": "Comment deleted"}, status=status.HTTP_204_NO_CONTENT
        )


class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for listing or retrieving comments."""

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

