from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField("Название", max_length=255)
    slug = models.SlugField("Slug", unique=True, blank=True)
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="children",
        verbose_name="Родительская категория",
    )
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)
    is_active = models.BooleanField("Активна", default=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name if not self.parent else f"{self.parent} → {self.name}"


class Product(models.Model):
    name = models.CharField("Название", max_length=255)
    slug = models.SlugField("Slug", unique=True, blank=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name="products",
        verbose_name="Категория",
    )
    description = models.TextField("Описание", blank=True)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2)
    sizes = models.CharField("Размеры", max_length=100, blank=True)
    fabric = models.CharField("Ткань", max_length=255, blank=True)
    season = models.CharField("Сезон", max_length=100, blank=True)
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)
    is_active = models.BooleanField("Активен", default=True)

    def __str__(self):
        return self.name

    def main_image(self):
        return self.images.filter(is_main=True).first() or self.images.first()


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="products/")
    is_main = models.BooleanField(default=False)
    alt = models.CharField(max_length=255, blank=True)


class Banner(models.Model):
    title = models.CharField("Заголовок", max_length=255)
    slug = models.SlugField("Slug", unique=True, blank=True)
    image = models.ImageField("Изображение", upload_to="banners/")
    link = models.URLField("Ссылка", max_length=500)
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)
    is_active = models.BooleanField("Активен", default=True)

    class Meta:
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class TextBlock(models.Model):
    key = models.CharField("Ключ", max_length=100, unique=True)
    slug = models.SlugField("Slug", unique=True, blank=True)
    content = models.TextField("Контент")
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)
    is_active = models.BooleanField("Активен", default=True)

    class Meta:
        verbose_name = "Текстовый блок"
        verbose_name_plural = "Текстовые блоки"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.key)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.key


class Review(models.Model):
    name = models.CharField("Имя", max_length=255)
    slug = models.SlugField("Slug", unique=True, blank=True)
    photo = models.ImageField("Фото", upload_to="reviews/", blank=True, null=True)
    text = models.TextField("Текст")
    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)
    is_active = models.BooleanField("Активен", default=True)

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
