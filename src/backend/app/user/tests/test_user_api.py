"""Test suit for user APIs"""

import tempfile
from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from user.serializers import UserSerializer
from user.models import Tag
import os
from PIL import Image


CREATE_USER_URL = reverse("user:create")
TOKEN_URL = reverse("user:token")
ME_URL = reverse("user:me")
USERLIST_URL = reverse("user:user-list")


def create_user(**params):
    """Create and return user"""
    defaults = {
        "email": "test@example.com",
        "password": "testPass123",
        "name": "name",
    }
    defaults.update(params)

    return get_user_model().objects.create_user(**defaults)


class PublicUserApiTests(TestCase):
    """Test the public features of the user api"""

    def setUp(self):
        self.client = APIClient()

    def test_create_user_success(self):
        """Test creating a user is successful"""
        payload = {
            "email": "test@example.com",
            "password": "testPass123",
            "name": "name",
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(email=payload["email"])
        self.assertTrue(user.check_password(payload["password"]))
        self.assertNotIn("password", res.data)

    def test_user_with_email_exists_error(self):
        """Test error returned if user with email exists."""
        payload = {
            "email": "test@example.com",
            "password": "testPass123",
            "name": "name",
        }
        create_user(**payload)
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short_error(self):
        """Test an error is returned if password less then 5 characters"""
        payload = {
            "email": "test@example.com",
            "password": "sh",
            "name": "name",
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = (
            get_user_model().objects.filter(email=payload["email"]).exists()
        )
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test generate token for valid credentials"""
        user_details = {
            "email": "test@example.com",
            "password": "testPass123",
            "name": "name",
        }

        create_user(**user_details)

        payload = {
            "email": user_details["email"],
            "password": user_details["password"],
        }

        res = self.client.post(TOKEN_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("token", res.data)

    def test_create_token_bad_credentials(self):
        """Test returns error if credentials invalid"""
        user_details = {
            "email": "test@example.com",
            "password": "testPass123",
            "name": "name",
        }

        payload1 = {"email": user_details["email"], "password": "wrongpass"}

        payload2 = {
            "email": "wrongemail@example.com",
            "password": user_details["password"],
        }

        create_user(**user_details)

        res = self.client.post(TOKEN_URL, payload1)
        res1 = self.client.post(TOKEN_URL, payload2)

        self.assertNotIn("token", res.data)
        self.assertNotIn("token", res1.data)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(res1.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unathorized(self):
        """Authentication is required for users"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_user_public(self):
        """Test for list users"""
        create_user()
        create_user(email="test1@example.com")

        res = self.client.get(USERLIST_URL)

        users = get_user_model().objects.all()
        serializer = UserSerializer(users, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_retrieve_user_detaileduser(self):
        """Test for retrieving certain user"""
        create_user()
        USER_URL = reverse("user:user-detail", kwargs={"pk": 1})
        res = self.client.get(USER_URL)

        user = get_user_model().objects.get(pk=1)
        serializer = UserSerializer(user)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_user_with_new_tags(self):
        """Test if create new user with tags successful."""

        payload = {
            "email": "test@example.com",
            "password": "testPass123",
            "name": "name",
            "tags": [{"name": "Django"}, {"name": "Python"}],
        }
        res = self.client.post(CREATE_USER_URL, payload, format="json")
        user = get_user_model().objects.get(email=payload["email"])

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(user.tags.count(), 2)
        for tag in payload["tags"]:
            exists = user.tags.filter(name=tag["name"]).exists()
            self.assertTrue(exists)

    def test_create_user_with_existing_tags(self):
        """Test creating user with existing tags."""

        Tag.objects.create(name="Django")

        payload = {
            "email": "test@example.com",
            "password": "testPass123",
            "name": "name",
            "tags": [
                {"name": "Django"},
                {"name": "Python"},
                {"name": "React"},
            ],
        }
        res = self.client.post(CREATE_USER_URL, payload, format="json")
        user = get_user_model().objects.get(email=payload["email"])
        tags = Tag.objects.all()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(user.tags.count(), 3)
        self.assertEqual(len(tags), 3)


###################### Tests for authenticated ######################## noqa
class PrivateUserApiTests(TestCase):
    """Test API requests that require authentication."""

    def setUp(self):
        self.user = create_user(
            email="test@example.com",
            password="examplePass123",
            name="Test User",
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test retriving profile for logged user"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data.get("name"), self.user.name)
        self.assertEqual(res.data.get("email"), self.user.email)

    def test_me_not_allowed(self):
        """Test POST is not allowed for the endpoint"""
        res = self.client.post(ME_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """Test updating the user profile for authenticated user."""
        payload = {"name": "Updated Name", "password": "NewPassword123"}

        res = self.client.patch(ME_URL, payload)
        self.user.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.name, payload["name"])
        self.assertTrue(self.user.check_password(payload["password"]))

    def test_update_user_profile_without_code(self):
        """Test updating the user profile
        for authenticated without password."""
        payload = {"name": "Updated Name"}

        res = self.client.patch(ME_URL, payload)
        self.user.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.name, payload["name"])
        self.assertTrue(self.user.check_password("examplePass123"))

    def test_update_existing_tags_in_user(self):
        """Test if possible to update tags field."""
        payload = {
            "tags": [
                {"name": "Django"},
                {"name": "Python"},
                {"name": "React"},
            ],
        }

        res = self.client.patch(ME_URL, payload, format="json")
        self.user.refresh_from_db()
        tags = Tag.objects.all()

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        self.assertEqual(self.user.tags.count(), 3)
        self.assertEqual(len(tags), 3)

    def test_update_user_assign_existing_tags(self):
        """Test if reassigning existing tags while update successful"""
        payload1 = {
            "tags": [
                {"name": "Django"},
                {"name": "Python"},
                {"name": "React"},
            ],
        }
        self.client.patch(ME_URL, payload1, format="json")
        self.user.refresh_from_db()

        payload2 = {
            "tags": [
                {"name": "DRF"},
            ],
        }
        res = self.client.patch(ME_URL, payload2, format="json")
        self.user.refresh_from_db()

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.tags.count(), 1)
        self.assertFalse(self.user.tags.filter(name="Django").exists())
        self.assertTrue(self.user.tags.filter(name="DRF").exists())


class ImageUploadTests(TestCase):
    """Test for image upload API"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email="test@example.com",
            password="examplePass123",
            name="Test User",
        )
        self.client.force_authenticate(self.user)

    def tearDown(self):
        self.user.profile_image.delete()

    def test_upload_image(self):
        """Test uploading an image to a user sucess"""
        with tempfile.NamedTemporaryFile(suffix=".jpg") as image_file:
            img = Image.new("RGB", (10, 10))
            img.save(image_file, format="JPEG")
            image_file.seek(0)
            payload = {"profile_image": image_file}
            res = self.client.patch(ME_URL, payload, format="multipart")

        self.user.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn("profile_image", res.data)
        self.assertTrue(os.path.exists(self.user.profile_image.path))

    def test_upload_image_bad_request(self):
        """Test uploading invalid image"""

        payload = {"profile_image": "notanimage"}
        res = self.client.patch(ME_URL, payload, format="multipart")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
