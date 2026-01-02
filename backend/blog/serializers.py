from rest_framework import serializers
from .models import Category, Post, PostImage

class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = PostImage
        fields = ['id', 'image', 'caption']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'name_tr', 'slug']

class PostSerializer(serializers.ModelSerializer):
    # To show category details
    category_detail = CategorySerializer(source='category', read_only=True)
    # To embed the gallery inside the post
    gallery = PostImageSerializer(many=True, read_only=True)
    cover_image = serializers.ImageField(use_url=True)
    class Meta:
        model = Post
        fields = ['id', 'title', 'title_tr', 'slug', 'content', 'content_tr', 'cover_image', 'location', 'location_tr', 'category', 'category_detail', 'gallery', 'created_at']