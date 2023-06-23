from django.db import models
from user.models import User

# Create your models here.
class Tag(models.Model):    
    name = models.CharField(max_length=25,primary_key=True)    
    created = models.DateTimeField(auto_now_add=True)    
    
    def __str__(self):        
        return f"#{self.name} "

class Project(models.Model):
    
    name = models.CharField(max_length=255)
    author=models.ForeignKey("User")
    project_image = models.ImageField(upload_to="projects/",blank=True,null=True)
    short_desc= models.CharField(max_length=255,blank=True,null=True)
    bio = models.TextField(blank=True, null=True)
    tag = models.ManyToManyField("Tag", blank=True, null=True)
    github_link = models.CharField(max_length=255, blank=True, null=True)
    website_link = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):        
        return f"#{self.name} "
