from rest_framework import serializers
from .models import Category, Post, PostImage

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image', 'caption']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class PostSerializer(serializers.ModelSerializer):
    # To show category details
    category_detail = CategorySerializer(source='category', read_only=True)
    # To embed the gallery inside the post
    gallery = PostImageSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'content', 'cover_image', 'location', 'category', 'category_detail', 'gallery', 'created_at']