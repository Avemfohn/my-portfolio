from django.db import models
from django.utils.text import slugify # purpose: to create URL-friendly slugs
from django.core.validators import MinValueValidator, MaxValueValidator # purpose: to validate rating fields
from django.db.models import F
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
    description = models.TextField(blank=True, help_text="English Description")
    description_tr = models.TextField(blank=True, null=True, verbose_name="Açıklama (Türkçe)")
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


class Experience(models.Model):

    Category_CHOICES = (
        ('work', 'Work Experience'),
        ('education', 'Education'),
        ('certificate', 'Certificate'),
    )
    category = models.CharField(max_length=20, choices=Category_CHOICES, default='work')

    company = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True, help_text="English Description")
    description_tr = models.TextField(blank=True, null=True, verbose_name="Açıklama (Türkçe)")
    skills = models.ManyToManyField('Skill', blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = [F('end_date').desc(nulls_first=True), '-start_date']

    def __str__(self):
        return f"[{self.get_category_display()}] {self.title}"