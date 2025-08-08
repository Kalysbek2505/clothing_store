import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

from django.core.wsgi import get_wsgi_application

# Инициализируем Django
application = get_wsgi_application()

# Автосоздание суперпользователя
ADMIN_USER     = os.getenv('ADMIN_USER')
ADMIN_EMAIL    = os.getenv('ADMIN_EMAIL')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD')

if ADMIN_USER and ADMIN_EMAIL and ADMIN_PASSWORD:
    try:
        from django.contrib.auth import get_user_model
        from django.db.utils import OperationalError
        
        User = get_user_model()
        # проверяем, нет ли такого пользователя
        if not User.objects.filter(username=ADMIN_USER).exists():
            User.objects.create_superuser(ADMIN_USER, ADMIN_EMAIL, ADMIN_PASSWORD)
    except OperationalError:
        # База может быть ещё не готова — пропускаем
        pass


application = get_wsgi_application()

