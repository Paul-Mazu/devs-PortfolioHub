from django.db import models

# Create your models here.
class Tag(models.Model):    
    name = models.CharField(max_length=25,primary_key=True)    
    created = models.DateTimeField(auto_now_add=True)    
    
    def __str__(self):        
        return f"#{self.name} "

class Project(models.Model):
    """
    Photo of project
    Project name
    Author full  name
    Short description 200signs
    Long Description - text
    max 5 tags - tech stack
    Link github
    link live demo
    """
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='')
    short_desc= models.CharField(max_length=255)
    long_desc = models.TextField()
    tech_stack = models.OneToMany("max 5")
    github_link=""
    demo_link=""

