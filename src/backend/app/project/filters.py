from django_filters import rest_framework as filters
from django_filters.widgets import RangeWidget
from.models import Project, Comment



class ProjectFilter(filters.FilterSet):
    """Filter Class for Project model"""
    name = filters.CharFilter(field_name="name",lookup_expr="icontains") 
    author = filters.CharFilter(field_name="author__name", lookup_expr="icontains")
    author_id = filters.NumberFilter(field_name= "author__id")
    tags = filters.CharFilter(field_name="tags__name", lookup_expr="icontains")
    created = filters.DateFromToRangeFilter(widget=RangeWidget(attrs={"type":"date"}))


    class Meta:
        model = Project
        fields = ["name", "author", "author_id", "tags"]        
        

class CommentFilter(filters.FilterSet):
    """Filter Class for Comment model"""
    project = filters.CharFilter(field_name="project__name",lookup_expr='icontains') 
    author = filters.CharFilter(field_name="author__name", lookup_expr="icontains")
    created = filters.DateFromToRangeFilter(widget=RangeWidget(attrs={"type":"date"}))


    class Meta:
        model = Comment
        fields = ["project","author","created"]