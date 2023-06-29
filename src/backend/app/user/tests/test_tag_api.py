"""Test suit for tag APIs"""
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from user.models import Tag

from user.serializers import TagSerializer, UserSerializer

TAGS_URL = reverse("user:tag-list")


def create_user(email="test@example.com", password="TestPass123", **kwargs):
    """Create and return user"""
    return get_user_model().objects.create_user(
        email=email, password=password, **kwargs
    )


class PublicTagsAPITests(TestCase):
    """Test unauthenticated API requests."""

    def setUp(self):
        self.client = APIClient()

    def test_retrieve_tags(self):
        """Test retrieve tag successful"""
        Tag.objects.create(name="Python")
        Tag.objects.create(name="JavaScript")

        res = self.client.get(TAGS_URL)

        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_tags_in_user(self):
        """Test list of tags in certain user"""
        tag = Tag.objects.create(name="Python")
        tag1 = Tag.objects.create(name="JavaScript")

        user = create_user()
        user.tags.set([tag, tag1])

        USER_URL = reverse("user:user-detail", kwargs={"pk": 1})
        res = self.client.get(USER_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data["tags"]), 2)
