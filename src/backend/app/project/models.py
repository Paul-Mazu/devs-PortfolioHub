from django.db import models
from user.models import Tag
from django.conf import settings


class Project(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    project_image = models.ImageField(
        upload_to="projects/", blank=True, null=True
    )
    short_desc = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    github_link = models.CharField(max_length=255, blank=True, null=True)
    website_link = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"#{self.name} "
