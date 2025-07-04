// main.js — загрузка и отображение товаров с анимацией и сортировкой

// Базовый URL API для продуктов
const baseProductApiUrl = 'http://127.0.0.1:8000/backend/api/products/';

// Ключевые элементы DOM
let productListContainer;
let sortOptionsContainer;
let sortButton;

/**
 * Загрузка и отображение списка товаров
 * @param {string} apiUrl
 */
function loadProducts(apiUrl) {
  if (!productListContainer) return;
  productListContainer.innerHTML = ''; // Очистка контейнера перед вставкой

  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return res.text().then(text => Promise.reject('Ожидался JSON, но получен не JSON'));
      }
      return res.json();
    })
    .then(data => {
      if (!data.results || !Array.isArray(data.results)) {
        productListContainer.innerHTML = '<div class="col-12 text-center">Неверный формат данных</div>';
        return;
      }
      if (data.results.length === 0) {
        productListContainer.innerHTML = '<div class="col-12 text-center">Товары не найдены</div>';
        return;
      }

      data.results.forEach((product, index) => {
        // Создаем ссылку-обёртку
        const a = document.createElement('a');
        a.href = `product.html?id=${product.id}`;
        a.className = 'col-6 col-md-4 col-lg-3 mb-4 text-decoration-none text-dark fade-in';
        a.setAttribute('data-aos', 'fade-up');

        // Карточка
        const card = document.createElement('div');
        card.className = 'card h-100 card-product';

        // Изображение
        const img = document.createElement('img');
        img.srcset = ` 300w, ${product.main_image_url} 1200w`;
        img.sizes = '(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw';
        img.alt = product.name || '';
        img.className = 'card-img-top';
        img.loading = 'lazy';
        // Тело карточки
        const body = document.createElement('div');
        body.className = 'card-body text-center p-2';

        const title = document.createElement('h6');
        title.className = 'card-title fw-semibold mb-1';
        title.textContent = product.name || 'Без названия';

        const price = document.createElement('p');
        price.className = 'card-text text-muted mb-0';
        price.textContent = product.price !== undefined ? `${product.price} ₽` : 'Цена не указана';

        body.append(title, price);
        card.append(img, body);
        a.append(card);
        productListContainer.append(a);

        // Анимация появления
        setTimeout(() => a.classList.add('visible'), 100 + index * 100);
      });

      if (window.AOS) AOS.refreshHard();
    })
    .catch(err => {
      console.error('Ошибка загрузки товаров:', err);
      productListContainer.innerHTML = `<div class="col-12 text-center text-danger">Ошибка: ${err}</div>`;
    });
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем элементы
  productListContainer = document.getElementById('product-list');
  sortOptionsContainer = document.getElementById('sort-options');
  sortButton = document.getElementById('sort-button');

  if (productListContainer) {
    loadProducts(`${baseProductApiUrl}?is_active=true`);
  }

  // Логика сортировки
  if (sortOptionsContainer && sortButton) {
    sortOptionsContainer.addEventListener('click', event => {
      if (!event.target.classList.contains('dropdown-item')) return;
      event.preventDefault();
      const ordering = event.target.getAttribute('data-ordering');
      sortButton.textContent = ordering ? `Сортировка: ${event.target.textContent}` : 'Сортировка';
      let url = `${baseProductApiUrl}?is_active=true`;
      if (ordering) url += `&ordering=${ordering}`;
      loadProducts(url);
    });
  }
});
// main.js

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('product-detail');
  if (root) initProductDetail(root);
});

async function initProductDetail(root) {
  // 1. Получаем ID
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    root.textContent = 'Ошибка: ID товара не задан';
    return;
  }

  // 2. Запрос к API
  let res;
  try {
    res = await fetch(`http://127.0.0.1:8000/backend/api/products/${id}/`);
  } catch (err) {
    root.textContent = 'Ошибка сети при загрузке товара';
    return;
  }
  if (!res.ok) {
    root.textContent = `Ошибка ${res.status}: не удалось загрузить товар`;
    return;
  }
  const p = await res.json();

  // 3. Рендерим всю страницу целиком
  root.innerHTML = `
    <!-- Хлебные крошки -->
    <nav class="breadcrumb mb-4">
      <a href="/">Главная</a><span>/</span>
      <a href="/catalog">Каталог</a><span>/</span>
      <span class="active">${p.category.name}</span>
    </nav>

    <div class="product-row d-flex flex-wrap">
      <!-- Левая колонка: карусель -->
      <div class="product-images position-relative col-md-6 mb-4">
        <img 
          id="mainImage"
          src="${p.main_image_url || (p.images[0] && p.images[0].image_url) || ''}" 
          alt="${p.name}"
          class="w-100"
        >
        <button id="prev" class="carousel-btn prev">‹</button>
        <button id="next" class="carousel-btn next">›</button>
        <div class="thumbnails d-flex mt-3">
          ${p.images.map((img, i) => `
            <img 
              src="${img.image_url}" 
              data-idx="${i}" 
              class="thumb ${i === 0 ? 'active' : ''}" 
              alt="${img.alt || p.name}"
            />
          `).join('')}
        </div>
      </div>

      <!-- Правая колонка: информация -->
      <div class="product-info col-md-6">
        <h1 class="h3 font-weight-bold mb-3">${p.name}</h1>
        <div class="price text-success h4 mb-4">${p.price} ₽</div>
        <div class="meta mb-2"><strong>Размеры:</strong> ${p.sizes || '—'}</div>
        <div class="meta mb-2"><strong>Ткань:</strong> ${p.fabric || '—'}</div>
        <div class="meta mb-4"><strong>Сезон:</strong> ${p.season || '—'}</div>
        <div class="description-title font-weight-medium mb-2">Описание</div>
        <div class="description-text mb-4">${p.description || 'Описание отсутствует.'}</div>
        <button id="addToCart" class="btn-order btn btn-primary btn-lg btn-block">
          Заказать
        </button>
      </div>
    </div>
  `;

  // 4. Карусель: логика prev/next и клики по миниатюрам
  const imgs   = p.images.map(i => i.image_url);
  let curr     = 0;
  const main   = document.getElementById('mainImage');
  const thumbs = document.querySelectorAll('.thumbnails .thumb');

  document.getElementById('prev').onclick = () => {
    curr = (curr - 1 + imgs.length) % imgs.length;
    updateCarousel();
  };
  document.getElementById('next').onclick = () => {
    curr = (curr + 1) % imgs.length;
    updateCarousel();
  };
  thumbs.forEach(t => t.onclick = () => {
    curr = +t.dataset.idx;
    updateCarousel();
  });

  function updateCarousel() {
    main.src = imgs[curr];
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === curr);
    });
  }
}

// main.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) renderProductDetail(id);
});

async function renderProductDetail(id) {
  const res = await fetch(`http://127.0.0.1:8000/backend/api/products/${id}/`);
  if (!res.ok) return console.error('Ошибка', res.status);
  const prod = await res.json();

  // Заполняем текстовые поля
  document.getElementById('product-name').textContent = prod.name;
  document.getElementById('product-price').textContent = `${prod.price} ₽`;
  document.getElementById('product-desc').textContent = prod.description;
  document.getElementById('breadcrumb-product').textContent = prod.name;

  // Собираем массив URL-ов изображений
  let urls = [];
  if (Array.isArray(prod.images) && prod.images.length) {
    // вариант с вложенным сериализатором
    urls = prod.images.map(img => img.image_url);
  } else if (Array.isArray(prod.image_urls) && prod.image_urls.length) {
    // вариант со старым SerializerMethodField
    urls = prod.image_urls.slice();
  } else if (prod.main_image_url) {
    // fallback на main_image_url
    urls = [prod.main_image_url];
  }

  buildGallery(urls);
}

function buildGallery(urls) {
  const gallery = document.getElementById('thumbnail-gallery');
  const mainImg = document.getElementById('main-image');
  gallery.innerHTML = '';

  // Если нет ни одного URL, ничего не рисуем
  if (!urls.length) return;

  urls.forEach((url, idx) => {
    const thumb = document.createElement('img');
    thumb.src = url;
    thumb.alt = document.getElementById('product-name').textContent;
    thumb.className = idx === 0 ? 'selected' : '';
    if (idx === 0) {
      mainImg.src = url;
    }
    thumb.addEventListener('click', () => {
      gallery.querySelectorAll('img').forEach(i => i.classList.remove('selected'));
      thumb.classList.add('selected');
      mainImg.src = url;
    });
    gallery.appendChild(thumb);
  });
}
