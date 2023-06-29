"""Tests for models.py"""
from os import name
from django.test import TestCase
from django.contrib.auth import get_user_model
from user.models import Tag


def create_user(email="user@example.com", password="TestPass123"):
    """Create and return user."""
    return get_user_model().objects.create_user(email, password)


class UserModelTests(TestCase):
    """Test Models for user"""

    def test_create_user_with_email_successful(self):
        """Test for creating user with an email is successful"""
        email = "test@example.com"
        password = "testpassword123"
        user = get_user_model().objects.create_user(
            email=email,
            password=password,
        )
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test if email is normalized for new users"""
        sample_emails = [
            ["test1@EXAMPLE.com", "test1@example.com"],
            ["Test2@Example.com", "Test2@example.com"],
            ["TEST3@EXAMPLE.com", "TEST3@example.com"],
            ["test4@example.COM", "test4@example.com"],
        ]

        for email, expected in sample_emails:
            user = get_user_model().objects.create_user(email, "testpass123")
            self.assertEqual(user.email, expected)

    def test_new_user_without_email_raises_error(self):
        """Test that new user without email raises ValueError"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user("", "Testpassword123")

    def test_create_superuser(self):
        "Test creating superuser"
        user = get_user_model().objects.create_superuser(
            "test@example.com", "Testpassword123"
        )
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)


class TagModelTest(TestCase):
    """Testsuit for Tag Model."""

    def test_create_tag_successful(self):
        """Test create tag successful"""
        tag_name = "Python"
        tag = Tag.objects.create(name=tag_name)

        self.assertEqual(tag.name, tag_name)
        self.assertEqual(str(tag), f"#{tag_name}")
