"""Views for the user api"""
from rest_framework import (
    generics,
    authentication,
    permissions,
    viewsets,
    mixins,
)
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from user.serializers import UserSerializer, AuthTokenSerializer, TagSerializer
from django.contrib.auth import get_user_model
from .models import Tag


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system."""

    serializer_class = UserSerializer


class CreateTokenView(ObtainAuthToken):
    """Create authtoken for user for future requests"""

    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateDestroyAPIView):
    """Manage the authenticated user PUT/PATCH"""

    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Retrieve and return"""
        return self.request.user


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for listing or retrieving users."""

    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()


class TagViewSet(
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """Manage Tags in the database"""

    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == "list":
            return []
        return super().get_permissions()
