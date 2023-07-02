from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from project.models import Comment, Project


def create_user(**params):
    """Create and return user"""
    defaults = {
        "email": "test@example.com",
        "password": "testPass123",
        "name": "name",
    }
    defaults.update(params)

    return get_user_model().objects.create_user(**defaults)

class CommentAPITestCase(TestCase):
    """Test API requests that require authentication."""

    def setUp(self):
        self.user1 = create_user(
            email="test1@example.com",
            password="examplePass123",
            name="Test User1",
        )
        self.client1 = APIClient()
        self.client1.force_authenticate(user=self.user1)

        self.user2 = create_user(
            email="test2@example.com",
            password="examplePass321",
            name="Test User2",
        )
        self.client2 = APIClient()
        self.client2.force_authenticate(user=self.user2)

        self.project = Project.objects.create(
            name="Test Project",
            author=self.user1,
            short_desc="Test Description"
        )

        self.comment = Comment.objects.create(
            project=self.project,
            author=self.user1,
            body="Test comment"
        )

    ########################## Tests for unauthenticated ##########################

    def test_view_comments_unauth(self):
        """Test viewing comments unauthenticated"""
        self.client.logout()
        response = self.client.get(reverse("project:comments-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_comment_unauth(self):
        """Test retrieving specific comment unauthenticated"""
        self.client.logout()
        comment_detail_url = reverse("project:comments-detail", kwargs={"pk": 1})
        response = self.client.get(comment_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_comment_unauth(self):
        """Test attempting to create a comment without authentication"""
        data = {
            "project": self.project.id,
            "body": "This is a test comment."
        }
        self.client.logout()
        response = self.client.post(reverse("project:my-comments-list"), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_comment_unauth(self):
        """Test attempting update a comment without authentication"""
        comment_detail_url = reverse("project:my-comments-detail", kwargs={"pk": 1})
        data = {
            "body": "Updated comment"
        }
        self.client.logout()
        response = self.client.patch(comment_detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_comment_unauth(self):
        """Test deleting a comment without authentication"""
        comment_detail_url = reverse("project:my-comments-detail", kwargs={"pk": 1})
        self.client.logout()
        response = self.client.delete(comment_detail_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    ########################## Tests for authenticated ##########################

    def test_view_comments(self):
        """Test viewing comments authenticated"""
        response = self.client2.get(reverse("project:comments-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_comment(self):
        """Test retrieving specific comment authenticated"""
        comment_detail_url = reverse("project:comments-detail", args=[self.comment.id])
        response = self.client2.get(comment_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_comment(self):
        """Test creating a comment with an authenticated user"""
        data = {
            "project": self.project.id,
            "body": "This is a test comment."
        }
        response = self.client2.post(reverse("project:my-comments-list"), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 2) # change this check data compare

    def test_update_comment_same_user(self):
        """Test updating a comment by the author"""
        comment_detail_url = reverse("project:my-comments-detail", kwargs={"pk": 1})
        data = {
            "body": "Updated comment"
        }
        response = self.client1.patch(comment_detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.comment.refresh_from_db()
        self.assertEqual(self.comment.body, "Updated comment")

    def test_update_comment_different_user(self):
        """Test updating a comment with a different authenticated user"""
        comment_detail_url = reverse("project:my-comments-detail", kwargs={"pk": 1})
        data = {
            "body": "Updated comment"
        }
        response = self.client2.patch(comment_detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_comment_author(self):
        """Test deleting a comment by the author"""
        comment_detail_url = reverse("project:my-comments-detail", kwargs={"pk": 1})
        response = self.client1.delete(comment_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Comment.objects.filter(pk=self.comment.id).exists())

    def test_delete_comment_different_user(self):
        """Test deleting a comment with a different authenticated user"""
        comment_detail_url = reverse("project:my-comments-detail", kwargs={"pk": 1})
        response = self.client2.delete(comment_detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
