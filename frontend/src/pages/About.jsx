// src/pages/About.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="site-section site-section-sm bg-light" data-aos="fade-up">
      <div className="container">
        {/* Заголовок */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-7 text-center">
            <h2 className="text-black">О нас</h2>
            <p className="lead text-muted">
              Мы объединяем традиции и современность в каждой коллекции.
            </p>
          </div>
        </div>

        {/* Контент */}
        <div className="row align-items-center">
          {/* Изображение */}
          <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
            <img
              src="/images/Nurzat_logo1.png"
              alt="О нас"
              className="img-fluid rounded"
            />
          </div>

          {/* Текст */}
          <div className="col-md-6 pl-md-5" data-aos="fade-left">
            <p>
              Мы — производственная фабрика Nurzat, специализируемся на полном цикле создания одежды: от разработки эскиза и паттернов до готового изделия. Работаем с широким спектром моделей:
            </p>
            <p>
              Наши ценности:
            </p>
            <ul className="mb-4">
              <li>Высокое качество материалов и пошива</li>
              <li>Скромный, но стильный дизайн</li>
              <li>Ответственность за каждый этап производства</li>
              <li>Открытость и прозрачность в работе с партнёрами</li>
            </ul>
            <p>
              <a href="/catalog" className="btn btn-black rounded-0">
                Посмотреть каталог
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
