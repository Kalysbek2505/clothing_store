// src/pages/Catalog.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from '../components/ProductCard';

const PAGE_SIZE = 9;

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [ordering, setOrdering] = useState('');
  const [page, setPage] = useState(1);

  // Инициализация AOS один раз
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'slide', once: false });
  }, []);

  // Фетчим товары при изменении ordering, page или category
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const url = new URL('/backend/api/products/', window.location.origin);
        url.searchParams.set('ordering', ordering);
        url.searchParams.set('page', page);
        url.searchParams.set('page_size', PAGE_SIZE);
        if (category) {
          url.searchParams.set('category', category);
        }

        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}`);
        }

        const data = await res.json();
        setProducts(data.results || []);
        AOS.refresh();
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Ошибка загрузки каталога:', err);
          setProducts([]);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [ordering, page, category]);

  const sortOptions = [
    { label: 'По умолчанию',  value: '' },
    { label: 'Сначала новые', value: '-created_at' },
    { label: 'Цена ↑',         value: 'price' },
    { label: 'Цена ↓',         value: '-price' },
    { label: 'А-Я',            value: 'name' },
    { label: 'Я-А',            value: '-name' },
  ];

  return (
    <>
      {/* Хлебные крошки */}
      <div className="custom-border-bottom py-3 bg-light" data-aos="fade-right">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="/">Главная</a>
              <span className="mx-2 mb-0">/</span>
              <strong className="text-black">Каталог</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Секция каталога */}
      <section className="site-section py-5" data-aos="fade-up">
        <div className="container">
          {/* Сортировка */}
          <div className="row mb-5 align-items-center">
            <div className="col-md-6">
              <h2 className="text-black h5">Все товары</h2>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="dropdown">
                <button
                  className="btn btn-white btn-sm dropdown-toggle px-4"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Сортировка
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {sortOptions.map(opt => (
                    <li key={opt.value}>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setOrdering(opt.value);
                          setPage(1);
                        }}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Карточки товаров */}
          <div className="row">
            {products.length ? (
              products.map(p => <ProductCard key={p.id} product={p} />)
            ) : (
              <p className="text-center w-100">Товары не найдены.</p>
            )}
          </div>

          {/* Пагинация */}
          <nav>
            <ul className="pagination justify-content-center mt-4">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                >
                  ‹
                </button>
              </li>
              <li className="page-item active">
                <span className="page-link">{page}</span>
              </li>
              <li className={`page-item ${products.length < PAGE_SIZE ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPage(prev => prev + 1)}
                >
                  ›
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
