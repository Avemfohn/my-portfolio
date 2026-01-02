from rest_framework import serializers
from .models import Project, Skill, Experience, ContactMessage

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    # By using SkillSerializer, we can nest skill details within project representation
    skills = SkillSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = '__all__'

    # URL'yi kontrol edip gerekirse uzantı ekleyen fonksiyon
    def get_image(self, obj):
        if obj.image:
            url = obj.image.url
            # Eğer dosya isminde nokta yoksa (uzantı eksikse) .jpg ekle
            if '.' not in url.split('/')[-1]:
                return f"{url}.jpg"
            return url
        return None

class ExperienceSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Experience
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']