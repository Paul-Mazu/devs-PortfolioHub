#import unittest
#from unittest.mock import patch
from django.test import TestCase
from django.contrib.auth import get_user_model 
from project.models import Project, Comment
from rest_framework.test import APIClient
#from requests import get

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

        

    def test_create_project(self):# Is it really working
        """Test creating Project authenticated user""" 
        project_count = Project.objects.count()
        self.assertEqual(project_count,1)

   

    def test_object_name_is_title(self):
        """Test the str method"""
        project = Project.objects.get(id=1)
        expected_name = f"#{project.name} "
        self.assertEqual(str(project), expected_name)

     #### Stupid me, we can remove all the unnecessary tests for each fields below.
    ####  We have the one test to rule them all
    def test_project_fields(self):
        """Test all fields of the project"""
        project = Project.objects.get(id=1)
        self.assertEqual(project.name, "Test Project")
        self.assertEqual(project.author.name, "Test User")
        self.assertEqual(project.short_desc, "Test Description")
        self.assertEqual(project.bio, "Test Bio")
        self.assertEqual(project.github_link, "https://github_link_correct.com") # test if it is an actual url and if it has https ending, cant too many tests
        self.assertEqual(project.website_link, "https://website_link_correct.com") # test if it is an actual url and if it has https ending, cant too many tests

    # def test_project_github_link_url_correct(self):
    #     response = get(self.project.github_link)
    #     self.assertIn(response.status_code, [200, 400]) # pending
        # with patch(project.github_link) as mock_get:
        #     mock_response =  self.mock_get.return_value.status_code
        #     response = self.client.get("https://github_link_correct.com")
        #     self.assertEqual(response.status_code, mock_response )

    # def test_project_website_link(self):
    #     project = Project.objects.get(id=1)
    #     self.assertEqual(project.website_link, "Test Website Link")


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

        Project.objects.create(name="Test Project",
                                author= self.user,
                                short_desc="Test Description",
                                bio="Test Bio",
                                github_link="Test Github_Link",
                                website_link ="Test Website_Link",
                                )
        Comment.objects.create(project = project.name

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
        comment = Project.objects.get(id=1)
        self.assertEqual(comment.project, "Test Project")
        self.assertEqual(comment.author, "Test User")
        self.assertEqual(comment.body, "Test Description")
        self.assertEqual(project.bio, "Test Bio")
        self.assertEqual(project.github_link, "https://github_link_correct.com") # test if it is an actual url and if it has https ending, cant too many tests
        self.assertEqual(project.website_link, "https://website_link_correct.com") # test if it is an actual url and if it has https ending, cant too many tests

        

    


    




    

  




        