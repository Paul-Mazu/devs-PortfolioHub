# Generated by Django 4.2.2 on 2023-07-06 11:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import project.models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("project", "0003_comment"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="projects",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="project",
            name="project_image",
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to=project.models.project_image_file_path,
            ),
        ),
    ]
