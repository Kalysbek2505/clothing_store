#!/usr/bin/env bash
set -e

# 1) миграции
python manage.py migrate --noinput

# 2) сбор статики (если нужно)
python manage.py collectstatic --noinput

# 3) создаём суперюзера (если ещё нет)
python manage.py createsuperuser --noinput || true

# 4) запускаем Gunicorn
exec "$@"
