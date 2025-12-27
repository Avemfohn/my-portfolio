from rest_framework import viewsets
from .models import Project, Skill, Experience
from .serializers import ProjectSerializer, SkillSerializer, ExperienceSerializer
from django.db.models import F
class ProjectViewSet(viewsets.ModelViewSet):
    # Hangi verileri getireyim?
    queryset = Project.objects.filter(is_published=True).order_by('-created_at')
    # Hangi tercümanı kullanayım?
    serializer_class = ProjectSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer