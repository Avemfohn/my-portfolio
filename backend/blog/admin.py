from django.contrib import admin
from .models import Category, Post, PostImage

# Inline admin for PostImage to be used within PostAdmin
class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 3

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'created_at', 'is_published')
    search_fields = ('title', 'content', 'location')
    list_filter = ('category', 'is_published')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [PostImageInline]