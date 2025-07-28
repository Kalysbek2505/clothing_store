# admin.py
from django.contrib import admin
from django.utils.html import format_html

from .models import Banner, Category, Product, ProductImage, Review, TextBlock


# Определяем Inline для изображений продукта
class ProductImageInline(admin.TabularInline):  # Или StackedInline, если предпочитаете
    model = ProductImage
    extra = 1  # Позволяет добавить одно новое фото сразу
    readonly_fields = ("image_preview",)  # Поле для превью

    def image_preview(self, obj):
        # Функция для отображения превью в inline
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url,
            )
        return "Нет фото"

    image_preview.short_description = "Превью"


# Регистрируем админ-класс для Продукта
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "slug",
        "category",
        "price",
        "is_active",
        "created_at",
        "image_tag",
    )
    search_fields = ("name", "description")
    list_filter = ("category", "is_active", "created_at")
    readonly_fields = ("created_at", "updated_at", "image_tag")
    prepopulated_fields = {"slug": ("name",)}
    # --- ВОТ ЭТА СТРОКА ДОБАВЛЯЕТ РАЗДЕЛ ФОТОГРАФИЙ ---
    inlines = [ProductImageInline]
    # ----------------------------------------------------

    def image_tag(self, obj):
        # Эта функция показывает главное превью в общем списке товаров
        main_image = (
            obj.images.filter(is_main=True).first() or obj.images.first()
        )  # Используем related_name 'images'
        if main_image and main_image.image:
            return format_html(
                '<img src="{}" style="height:50px; border-radius:4px;" />',
                main_image.image.url,
            )
        return "-"

    image_tag.short_description = "Превью"


# ... (остальной код admin.py для Category, Banner и т.д. остается без изменений) ...


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "parent", "is_active", "created_at")
    search_fields = ("name",)
    list_filter = ("is_active", "created_at")
    readonly_fields = ("created_at", "updated_at")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "link", "is_active", "created_at", "image_tag")
    search_fields = ("title",)
    list_filter = ("is_active", "created_at")
    readonly_fields = ("created_at", "updated_at", "image_tag")
    prepopulated_fields = {"slug": ("title",)}

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 50px;"/>', obj.image.url)
        return "-"

    image_tag.short_description = "Превью"


@admin.register(TextBlock)
class TextBlockAdmin(admin.ModelAdmin):
    list_display = ("key", "slug", "is_active", "created_at")
    search_fields = ("key",)
    list_filter = ("is_active", "created_at")
    readonly_fields = ("created_at", "updated_at")
    prepopulated_fields = {"slug": ("key",)}


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "is_active", "created_at", "image_tag")
    search_fields = ("name", "text")
    list_filter = ("is_active", "created_at")
    readonly_fields = ("created_at", "updated_at", "image_tag")
    prepopulated_fields = {"slug": ("name",)}

    def image_tag(self, obj):
        if obj.photo:
            return format_html('<img src="{}" style="height: 50px;"/>', obj.photo.url)
        return "-"

    image_tag.short_description = "Превью"
