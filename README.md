# Clothing Store

## 📦 Требования

* Git
* Docker (>= 20.10)
* Docker Compose (`docker-compose` или `docker compose`)

## 1. Клонирование репозитория

```bash
git clone https://github.com/Kalysbek2505/clothing_store.git
cd clothing_store
```

## 2. Настройка переменных окружения

### 2.1 Backend

1. Скопируйте шаблон и заполните ваши значения:

   ```bash
   cp backend/.env.example backend/.env
   ```
2. Откройте `backend/.env` и задайте:

   ```env
   DEBUG=False
   SECRET_KEY=ваш_секрет_для_Django
   DB_HOST=db
   DB_NAME=clothing_store
   DB_USER=xyz
   DB_PASSWORD=1
   ```

## 3. Сборка и запуск стека

```bash
docker-compose down
docker-compose up -d --build
```

## 4. Миграции и сборка статики

1. **Создание миграций (если модели изменялись)**

   ```bash
   ```

docker-compose exec backend python manage.py makemigrations

````
2. **Применение миграций**
   ```bash
docker-compose exec backend python manage.py migrate
````

3. **Сборка статики Django**

   ```bash
   ```

docker-compose exec backend python manage.py collectstatic --noinput

````

## 5. Создание суперпользователя

```bash
docker-compose exec backend python manage.py createsuperuser
````

Следуйте подсказкам для ввода имени пользователя, email и пароля.

## 6. Проверка работы

* **React‑приложение**: откройте в браузере `http://localhost/`
* **API (пример)**:

  ```bash
  curl http://localhost/backend/api/products/
  ```
* **Админка**: откройте в браузере `http://localhost/admin/`

## 🔧 Полезные команды для отладки

* Просмотр логов:

  ```bash
  docker-compose logs -f backend
  docker-compose logs -f nginx
  ```
* Перезапуск одного сервиса:

  ```bash
  docker-compose restart backend
  ```
* Остановка и удаление всех контейнеров:

  ```bash
  docker-compose down
  ```
