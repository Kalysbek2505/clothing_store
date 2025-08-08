import os
from django.apps import AppConfig
from django.db.models.signals import post_migrate

class BackendConfig(AppConfig):
    name = 'backend'

    def ready(self):
        from django.contrib.auth import get_user_model
        from django.conf import settings

        def create_admin(sender, **kwargs):
            # только в проде, DEBUG=False
            if settings.DEBUG:
                return

            User = get_user_model()
            u = os.getenv('ADMIN_USER')
            e = os.getenv('ADMIN_EMAIL')
            p = os.getenv('ADMIN_PASSWORD')

            if u and p and not User.objects.filter(username=u).exists():
                User.objects.create_superuser(u, e or '', p)

        post_migrate.connect(create_admin, sender=self)
