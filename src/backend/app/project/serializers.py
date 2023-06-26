from rest_framework import serializers
from .models import Project
from user.models import Tag  # noqa


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for the Project model"""

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "short_desc",
            # "tag",
            "bio",
            "github_link",
            "website_link",
        ]
        read_only_fields = ["id"]
