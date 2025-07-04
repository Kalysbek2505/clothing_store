# urls.py
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (BannerViewSet, CategoryViewSet, ProductViewSet,
                    ReviewViewSet, TextBlockViewSet)

router = DefaultRouter()
router.register(r"categories", CategoryViewSet)
router.register(r"products", ProductViewSet)
router.register(r"banners", BannerViewSet)
router.register(r"textblocks", TextBlockViewSet)
router.register(r"reviews", ReviewViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
