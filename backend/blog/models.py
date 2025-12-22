from django.db import models
from django.utils.text import slugify

from portfolio.models import TimeStampedModel

# Category model to represent blog post categories
class Category(TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


#Post model to represent blog posts
class Post(TimeStampedModel):
    category = models.ForeignKey(Category, related_name='posts', on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    cover_image = models.ImageField(upload_to='blog/covers', blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    is_published = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


# multiple images for a blog post
class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='gallery', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='blog/gallery/')
    caption = models.CharField(max_length=100, blank=True, null=True, help_text="Optional caption for the image")


    def __str__(self):
        return f"Image for {self.post.title}"