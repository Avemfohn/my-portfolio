from rest_framework import serializers
from .models import Project, Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    # By using SkillSerializer, we can nest skill details within project representation
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'