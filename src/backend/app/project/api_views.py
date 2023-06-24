from rest_framework import generics,permissions
from rest_framework.authentication import TokenAuthentication
from .models import Project, Tag 
from user.models import User
from .serializers import ProjectSerializer

class ProjectList(generics.ListCreateAPIView):
    """Create a new Project or List all Projects """

    
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        """ Adding author and tags at creation of new project"""
        author_data = serializer.validated_data.get('author')
        tag_data = serializer.validated_data.get('tag', [])
        author = User.objects.create_user(**author_data)
        project = serializer.save(author=author)
        for tag_item in tag_data:
            tag, _ = Tag.objects.get_or_create(name=tag_item['name'])
            project.tag.add(tag)



class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve/Update/Delete Specific Project"""

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer