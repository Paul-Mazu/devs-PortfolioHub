from django.test import TestCase
from django.contrib.auth import get_user_model 
from project.models import Project, Comment
from rest_framework.test import APIClient


def create_user(**params):
    """Create and return user"""
    defaults = {
        "email": "test@example.com",
        "password": "testPass123",
        "name": "name",
    }
    defaults.update(params)

    return get_user_model().objects.create_user(**defaults)

class ProjectModelTest(TestCase):
    """Test Project model"""

    def setUp(self):
        self.user = create_user(
            email="test@example.com",
            password="examplePass123",
            name="Test User",
        )

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        Project.objects.create(name="Test Project",
                                author= self.user,
                                short_desc="Test Description",
                                bio="Test Bio",
                                github_link="Test Github_Link",
                                website_link ="Test Website_Link",
                                )

        

    def test_create_project(self):
        """Test creating Project authenticated user""" 
        project_count = Project.objects.count()
        self.assertEqual(project_count,1)

   

    def test_object_name_is_title(self):
        """Test the str method"""
        project = Project.objects.get(id=1)
        expected_name = f"#{project.name} "
        self.assertEqual(str(project), expected_name)

    
    def test_project_fields(self):
        """Test all fields of the project"""
        project = Project.objects.get(id=1)
        self.assertEqual(project.name, "Test Project")
        self.assertEqual(project.author.name, "Test User")
        self.assertEqual(project.short_desc, "Test Description")
        self.assertEqual(project.bio, "Test Bio")
        self.assertEqual(project.github_link, "Test Github_Link") # test if it is an actual url and if it has https ending, cant too many tests
        self.assertEqual(project.website_link, "Test Website_Link") # test if it is an actual url and if it has https ending, cant too many tests

class CommentModelTests(TestCase):
    """Test Comment model"""
   
    def setUp(self):
        self.user = create_user(
            email="test@example.com",
            password="examplePass123",
            name="Test User",
        ) 
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.user2 = create_user(
            email="test2@example.com",
            password="examplePass321",
            name="Test User2",
        )
        self.client2 = APIClient()
        self.client2.force_authenticate(user=self.user2)
        test_project=Project.objects.create(name="Test Project",
                                author= self.user,
                                short_desc="Test Description",
                                bio="Test Bio",
                                github_link="Test Github_Link",
                                website_link ="Test Website_Link",
                                )
        Comment.objects.create(project = test_project,
                               author= self.user2,
                               body="Test Comment"
                               )

    def test_create_comment(self):
        """Test creating Comment""" 
        comment_count = Comment.objects.count()
        self.assertEqual(comment_count,1)
          

    def test_object_name_is_title(self):
        """Test the str method"""
        comment = Comment.objects.get(id=1)
        expected_name = f"Comment by {comment.author} on {comment.project}"
        self.assertEqual(str(comment), expected_name)

    def test_comment_fields(self):
        """Test all fields of the comment"""
        comment = Comment.objects.get(id=1)
        self.assertEqual(comment.project.name, "Test Project")
        self.assertEqual(comment.author.name, self.user2.name)
        self.assertEqual(comment.body, "Test Comment")
        
        
 

        

    


    




    

  




        