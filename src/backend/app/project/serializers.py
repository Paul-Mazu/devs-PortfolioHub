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

    def _get_or_create_tags(self, tags, project):
        """Handle getting or creating tags as needed"""
        for tag in tags:
            tag_obj, _ = Tag.objects.get_or_create(
                **tag,
            )
            project.tags.add(tag_obj)

    def create(self, validated_data):
        """Create and return project."""
        tags = validated_data.pop("tags", [])
        project = Project.objects.create(**validated_data)
        self._get_or_create_tags(tags, project)
        return project

    def update(self, instance, validated_data):
        """Update and return data"""
        tags = validated_data.pop("tags", None)
        project = super().update(instance, validated_data)
        if tags is not None:
            instance.tags.clear()
            self._get_or_create_tags(tags, instance)
        return project

"""
Please test if:
- Test if create new project with tags successful. example: user\tests\test_user_api.py line 156
- Test creating project with existing tags. example: user\tests\test_user_api.py line 174
- Test if possible to update tags field. example: user\tests\test_user_api.py line 249
- Test if reassigning existing tags while update successful. example: user\tests\test_user_api.py line 268
"""