from django.contrib import admin
from .models import Banner, TextBlock, Review, Category, Product

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'link')
    search_fields = ('title',)


@admin.register(TextBlock)
class TextBlockAdmin(admin.ModelAdmin):
    list_display = ('key',)
    search_fields = ('key',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name', 'text')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price')
    search_fields = ('name', 'description') 