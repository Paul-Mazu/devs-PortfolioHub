"""Test suit for user APIs"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse("user:create")
TOKEN_URL = reverse("user:token")


def create_user(**params):
    """Create and return user"""
    return get_user_model().objects.create_user(**params)


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
