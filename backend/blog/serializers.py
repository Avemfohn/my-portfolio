from rest_framework import serializers
from .models import Category, Post, PostImage

class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PostImage
        fields = ['id', 'image', 'caption']

    def get_image(self, obj):
        if obj.image:
            url = obj.image.url
            if '/video/' in url:
                base_url = url.split('?')[0].rsplit('.', 1)[0]
                return f"{base_url}.mp4"

            if '.' in url.split('/')[-1]:
                return url

            return f"{url}.jpg"
        return None

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'name_tr', 'slug']

class PostSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source='category', read_only=True)
    gallery = PostImageSerializer(many=True, read_only=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'title_tr', 'slug', 'content', 'content_tr',
            'cover_image', 'preview_image', 'location', 'location_tr', 'category',
            'category_detail', 'gallery', 'created_at'
        ]

    def get_cover_image(self, obj):
        if obj.cover_image:
            url = obj.cover_image.url

            # Eğer Cloudinary dosyayı 'video' klasörüne attıysa linkte '/video/' geçer
            if '/video/' in url:
                # Sadece sondaki uzantıyı değiştiriyoruz, geri kalan her şeyi koruyoruz
                if '.' in url.split('/')[-1]:
                    base = url.rsplit('.', 1)[0]
                    return f"{base}.mp4"
                return f"{url}.mp4"

            # Eğer resim klasöründeyse (/image/) ve uzantı yoksa .jpg ekle
            if '.' not in url.split('/')[-1]:
                return f"{url}.jpg"

            return url
        return None

    def get_preview_image(self, obj):
        if obj.preview_image:
            url = obj.preview_image.url

            url = url.replace('/raw/upload/', '/image/upload/')
            url = url.replace('/video/upload/', '/image/upload/')

            if '.' not in url.split('/')[-1]:
                return f"{url}.jpg"
            return url

        elif obj.cover_image and not obj.cover_image.url.lower().endswith(('.mp4', '.mov', '.webm')):
             return self.get_cover_image(obj)

        return None