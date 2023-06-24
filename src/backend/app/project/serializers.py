from rest_framework import serializers
from .models import Project
from user.models import Tag
from user.serializers import UserSerializer
from user.serializers import TagSerializer


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for the Project model"""

    author = UserSerializer()
    tag = TagSerializer(many=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "name",
            "author",
            "short_desc",
            "bio",
            "tag",
            "github_link",
            "website_link",
        ]

    def create(self, validated_data):
        """Create and return a new Project instance"""

        author_data = validated_data.pop("author")
        tag_data = validated_data.pop("tag")
        author = self._create_or_update_user(author_data)
        project = Project.objects.create(author=author, **validated_data)
        self._add_tags(project, tag_data)

        return project

    def update(self, instance, validated_data):
        """Update and return an existing Project instance"""

        author_data = validated_data.pop("author", {})
        tag_data = validated_data.pop("tag", [])
        for key, value in validated_data.items():
            setattr(instance, key, value)
        if author_data:
            author = self._create_or_update_user(author_data)
            instance.author = author
        instance.tag.clear()
        self._add_tags(instance, tag_data)
        instance.save()

        return instance

    def _add_tags(self, project, tag_data):
        """Add tags to the project"""

        for tag_item in tag_data:
            tag, _ = Tag.objects.get_or_create(name=tag_item["name"])
            project.tag.add(tag)
