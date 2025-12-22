from rest_framework import viewsets
from .models import Project, Skill
from .serializers import ProjectSerializer, SkillSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    # Hangi verileri getireyim?
    queryset = Project.objects.all()
    # Hangi tercümanı kullanayım?
    serializer_class = ProjectSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer