from django.db import models
from django.utils.text import slugify # purpose: to create URL-friendly slugs
from django.core.validators import MinValueValidator, MaxValueValidator # purpose: to validate rating fields

#Abstract base model for common fields
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

# Skill model to represent individual skills
class Skill (TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    icon_name = models.CharField(max_length=100)  # e.g., FontAwesome icon name
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

# Project model to represent portfolio projects
class Project (TimeStampedModel):
    title = models.CharField(max_length=200)
    description = models.TextField()
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    skills = models.ManyToManyField(Skill, related_name='projects')
    is_published = models.BooleanField(default=False)
    priority = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    class Meta:
        ordering = ['priority', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title