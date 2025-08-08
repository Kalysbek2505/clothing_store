"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from django.contrib.auth import get_user_model
from django.db import OperationalError

# Автосоздание суперюзера
User = get_user_model()
username = os.getenv('ADMIN_USER')
email    = os.getenv('ADMIN_EMAIL')
password = os.getenv('ADMIN_PASSWORD')

if username and email and password:
    try:
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)
    except OperationalError:
        pass

application = get_wsgi_application()

