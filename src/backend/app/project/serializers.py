from rest_framework import serializers
from .models import Project
from user.models import Tag  # noqa
from user.serializers import TagSerializer, UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for the Project model"""

    tags = TagSerializer(many=True, required=False)
    author = UserSerializer(many=False, required=False, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "short_desc",
            "author",
            "tags",
            "bio",
            "github_link",
            "website_link",
        ]
        read_only_fields = ["id", "author"]

    def create(self, validated_data):
        """Create and return project."""
        tags = validated_data.pop("tags", [])
        project = Project.objects.create(**validated_data)
        for tag in tags:
            tag_obj, _ = Tag.objects.get_or_create(**tag)
            project.tags.add(tag_obj)
        return project
