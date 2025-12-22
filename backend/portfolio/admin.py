from django.contrib import admin
from .models import Project, Skill

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'priority', 'is_published', 'created_at')
    list_filter = ('is_published', 'skills')
    search_fields = ('title', 'description')
    # Slug field is auto-generated from title
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')