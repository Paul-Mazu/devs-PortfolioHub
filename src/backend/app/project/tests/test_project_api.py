"""Test suit for project APIs"""
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

from project.models import Project
from project.serializers import ProjectSerializer





# AUTH_URL = reverse("project:my-projects-list")
# UNAUTH_URL = reverse("project:projects")


project_data = {
         "name": "Test Project",
         "short_desc": "Test Description",
         "bio": "Test Bio",
         "github_link": "Test Github Link",
         "website_link": "Test Website Link",
     }
        

def create_user(**params):
    """Create and return user"""
    defaults = {
        "email": "test@example.com",
        "password": "testPass123",
        "name": "name",
    }
    defaults.update(params)

    return get_user_model().objects.create_user(**defaults)


class ProjectViewSetAuthTestCase(TestCase):
    """Test API requests that require authentication."""
    
    def setUp(self):        
        self.user = create_user(
            email="test@example.com",
            password="examplePass123",
            name="Test User",
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    # def test_view_all_projects(self):
    #     """Testing viewing of projects"""
    #     response = self.client.get(reverse("project:projects-list"))### here endpoint for "ProjectViewset" standard one
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     #### but actually do we need this test. Because we are not really testing auth users but processes that need auth.
    #     #### look at the documentation above. Pawel's documentation is the same :"""Test API requests that require authentication."""
    #     #### so I think view_all_projects, and test_view_specific_projects may not be necessary but the head method is.

    # def test_view_specific_projects(self):
    #     """Testing retrieving specific project"""
    #     self.client.force_authenticate(user=self.user)
    #     project = Project.objects.create(name="Test Project",
    #                         author= self.user,
    #                         short_desc="Test Description",
    #                         bio="Test Bio",
    #                         github_link="Test Github Link",
    #                         website_link ="Test Website Link",
    #                         )
    #     self.client.logout()
    #     response = self.client.get(reverse("project:projects-list"), kwargs={"pk":1})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)


        
    def test_create_project_authenticated(self):
        """Test creating Project"""
           
        response = self.client.post(reverse("project:my-projects-list"), project_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_project(self):
        """Test updating partially(patch) Project"""
        
        project = Project.objects.create(name="Test Project",
                            author= self.user,
                            short_desc="Test Description",
                            bio="Test Bio",
                            github_link="Test Github Link",
                            website_link ="Test Website Link",
                            )
        updated_field = {"bio":"Update Bio"} 
        URL = reverse("project:my-projects-detail", kwargs={"pk":1})
        response = self.client.patch(URL, updated_field)
        project.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # something to compare the end result as Pawel did

    def test_update_project_all_fields(self):
        """Test updating completely(put) Project"""
        project = Project.objects.create(name="Test Project",
                            author= self.user,
                            short_desc="Test Description",
                            bio="Test Bio",
                            github_link="Test Github Link",
                            website_link ="Test Website Link",
                            )
        ### renamed updated_field to update_data
        updated_data = {"name":"Test Project 2",
                    "author": self.user,                            
                    "short_desc":"Test Description 2",
                    "bio":"Test Bio 2",
                    "github_link":"Test Github Link 2",
                    "website_link":"Test Website Link 2",
        }
        URL = reverse("project:my-projects-detail", kwargs={"pk":1})
        response = self.client.put(URL, data=updated_data)
        serializer = ProjectSerializer(project) #### changed :instead of updated_field, project
        project.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_head_request(self):
        response = self.client.head(reverse("project:my-projects-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)







###################### Tests for unauthenticated ######################## noqa
class ProjectViewsetTestCase(TestCase):
    """Testing unauthenticated user requests"""

    def setUp(self):
        self.user = create_user(
            email="test@example.com",
            password="examplePass123",
            name="Test User",
        )
        self.client = APIClient()           
 

    def test_view_all_projects(self):
        """Testing viewing of projects"""
        response = self.client.get(reverse("project:projects-list"), project_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_view_specific_projects(self):
        """Testing retrieving specific project"""
        self.client.force_authenticate(user=self.user)
        project = Project.objects.create(name="Test Project",
                            author= self.user,
                            short_desc="Test Description",
                            bio="Test Bio",
                            github_link="Test Github Link",
                            website_link ="Test Website Link",
                            )
        self.client.logout()
        response = self.client.get(reverse("project:projects-list"), kwargs={"pk":1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_unauthenticated(self):
        """Testing unauthenticated create request"""
        response = self.client.post(reverse("project:projects-list"), project_data)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_project_unauthenticated(self):
        """Testing unauthenticated updating of projects"""
        # self.client.force_authenticate(user=self.user)
        # # project = Project.objects.create(name="Test Project",
        # #                     author= self.user,
        # #                     short_desc="Test Description",
        # #                     bio="Test Bio",
        # #                     github_link="Test Github Link",
        # #                     website_link ="Test Website Link",
        # #                     )
        # self.client.logout()
        updated_field = {"name":"Update Name"} 
        URL = reverse("project:projects-detail", kwargs={"pk":1})
        response = self.client.patch(URL, updated_field)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

       