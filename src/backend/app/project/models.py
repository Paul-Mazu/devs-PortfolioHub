from django.db import models
from user.models import Tag
from django.conf import settings
import uuid
import os


def project_image_file_path(instance, filename):
    """Generate file path for new recipe image."""
    ext = os.path.splitext(filename)[1]
    filename = f"{uuid.uuid4()}{ext}"
    return os.path.join("uploads", "project", filename)


class Project(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="projects",
    )
    project_image = models.ImageField(
        upload_to=project_image_file_path, blank=True, null=True
    )
    short_desc = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    github_link = models.CharField(max_length=255, blank=True, null=True)
    website_link = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"# {self.name} "


class Comment(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="comments",
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
    )
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ("created",)

    def __str__(self):
        return f"Comment by {self.author} on {self.project}"
