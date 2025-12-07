from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=100, verbose_name="Proje Başlığı")
    description = models.TextField(verbose_name="Açıklama")
    image = models.ImageField(upload_to='projects/', verbose_name="Proje Görseli")
    tech_stack = models.CharField(max_length=200, verbose_name="Teknolojiler")
    github_link = models.URLField(blank=True, null=True, verbose_name="GitHub Linki")
    live_link = models.URLField(blank=True, null=True, verbose_name="Canlı Demo Linki")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title