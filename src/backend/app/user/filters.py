from django_filters import rest_framework as filters
from.models import User



class UserFilter(filters.FilterSet):
    """Filter Class for Project model"""
    name = filters.CharFilter(field_name="name",lookup_expr="icontains") 
    tags = filters.CharFilter(field_name="tags__name", lookup_expr="icontains")
       

    class Meta:
        model = User
        fields = ["name", "tags"]

    
