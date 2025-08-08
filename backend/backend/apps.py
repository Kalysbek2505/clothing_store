import os
from django.apps import AppConfig
from django.db.models.signals import post_migrate

class BackendConfig(AppConfig):
    name = 'backend'

    def ready(self):
        from django.conf import settings
        from django.contrib.auth import get_user_model

        def create_admin(sender, **kwargs):
            User = get_user_model()
            if settings.DEBUG is False:
                env = os.environ
                u, e, p = env.get('ADMIN_USER'), env.get('ADMIN_EMAIL'), env.get('ADMIN_PASSWORD')
                if u and p and not User.objects.filter(username=u).exists():
                    User.objects.create_superuser(u, e or '', p)

        post_migrate.connect(create_admin, sender=self)
