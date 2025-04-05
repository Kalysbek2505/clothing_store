from django.db import models

class Category(models.Model):
    name = models.CharField("Название", max_length=255)
    parent = models.ForeignKey(
        'self', 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True, 
        related_name='children',
        verbose_name="Родительская категория"
    )

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name if not self.parent else f"{self.parent} → {self.name}"


class Product(models.Model):
    name = models.CharField("Название", max_length=255)
    category = models.ForeignKey(
        Category, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='products',
        verbose_name="Категория"
    )
    description = models.TextField("Описание", blank=True)
    price = models.DecimalField("Цена", max_digits=10, decimal_places=2)
    image = models.ImageField("Изображение", upload_to='products/', blank=True, null=True)

    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return self.name


class Banner(models.Model):
    title = models.CharField("Заголовок", max_length=255)
    image = models.ImageField("Изображение", upload_to='banners/')
    link = models.URLField("Ссылка", max_length=500)

    class Meta:
        verbose_name = "Баннер"
        verbose_name_plural = "Баннеры"

    def __str__(self):
        return self.title


class TextBlock(models.Model):
    key = models.CharField("Ключ", max_length=100, unique=True)
    content = models.TextField("Контент")

    class Meta:
        verbose_name = "Текстовый блок"
        verbose_name_plural = "Текстовые блоки"

    def __str__(self):
        return self.key


class Review(models.Model):
    name = models.CharField("Имя", max_length=255)
    photo = models.ImageField("Фото", upload_to='reviews/', blank=True, null=True)
    text = models.TextField("Текст")

    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"

    def __str__(self):
        return self.name
