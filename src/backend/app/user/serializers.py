"""Serializers for the user API view"""

from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from project.models import Tag

from django.utils.translation import gettext as _


class TagSerializer(serializers.ModelSerializer):
    """Serializer for the Tag model"""

    class Meta:
        model = Tag
        fields = ["name"]


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""

    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "email",
            "password",
            "name",
            "short_desc",
            "tags",
            "bio",
            "title",
            "address",
            "working_at",
            "status_open_to_work",
            "github_link",
            "linkedin_link",
            "website_link",
            "xing_link",
            "whatsapp",
            "messenger",
        ]
        read_only_fields = ["id"]

        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def create(self, validated_data):
        """Create and return a user with encrypted password."""
        tags = validated_data.pop("tags", [])
        user = get_user_model().objects.create_user(**validated_data)
        for tag in tags:
            tag_obj, _ = Tag.objects.get_or_create(
                **tag,
            )
            user.tags.add(tag_obj)
        return user

    def update(self, instance, validated_data):
        """Update and return data"""
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user AuthToken"""

    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get("email")
        password = attrs.get("password")
        user = authenticate(
            request=self.context.get("request"),
            username=email,
            password=password,
        )
        if not user:
            msg = _("Unable to authenticate with provided credentials.")
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs
