# views.py
from rest_framework import viewsets
from .models import Category, Product, Banner, TextBlock, Review
from .serializers import (
    CategorySerializer, ProductSerializer, 
    BannerSerializer, TextBlockSerializer, ReviewSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class BannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer

class TextBlockViewSet(viewsets.ModelViewSet):
    queryset = TextBlock.objects.all()
    serializer_class = TextBlockSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
