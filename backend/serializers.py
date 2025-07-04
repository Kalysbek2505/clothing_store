from rest_framework import serializers

from .models import Banner, Category, Product, ProductImage, Review, TextBlock


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ("id", "image_url", "alt", "is_main")

    def get_image_url(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url)


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    main_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product

        fields = "__all__"
        read_only_fields = ["image_urls", "main_image_url"]

    def get_main_image_url(self, obj):
        # НОВАЯ ФУНКЦИЯ: возвращает URL ОДНОГО главного изображения
        request = self.context.get("request")
        # Используем метод main_image() из модели Product
        main_image = (
            obj.main_image()
        )  # main_image() возвращает объект ProductImage или None
        if main_image and main_image.image and request:
            # Строим абсолютный URL
            return request.build_absolute_uri(main_image.image.url)
        # Можно вернуть URL "заглушки", если главного фото нет
        # return request.build_absolute_uri('/static/images/placeholder.png')
        return None  # Или просто None


class BannerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Banner
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class TextBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextBlock
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        return None
