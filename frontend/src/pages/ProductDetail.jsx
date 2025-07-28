// src/pages/ProductDetail.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BASE = 'http://127.0.0.1:8000/backend/api/products/';

export default function ProductDetail() {
  const { slug } = useParams();
  const [prod, setProd] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const mainImgRef = useRef();
  const thumbsRef  = useRef([]);

  // init AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  // fetch данных
  useEffect(() => {
    fetch(`${BASE}${slug}/`)
      .then(r => r.json())
      .then(data => {
        setProd(data);
        AOS.refreshHard();
      })
      .catch(err => console.error(err));
  }, [slug]);

  // карусель + зум
  useEffect(() => {
    if (!prod) return;
    let idx = 0;
    const imgs = prod.images.map(i => i.image_url);

    function update(i) {
      idx = i;
      mainImgRef.current.src = imgs[idx];
      thumbsRef.current.forEach((t,j) => {
        t.classList.toggle('active', j === idx);
      });
    }

    document.getElementById('prev').onclick = () =>
      update((idx - 1 + imgs.length) % imgs.length);
    document.getElementById('next').onclick = () =>
      update((idx + 1) % imgs.length);

    const zoomWrap = document.querySelector('.zoom-container');
    zoomWrap.onmousemove = e => {
      const { left, top, width, height } = zoomWrap.getBoundingClientRect();
      const x = ((e.clientX - left) / width)  * 100;
      const y = ((e.clientY - top)  / height) * 100;
      mainImgRef.current.style.transformOrigin = `${x}% ${y}%`;
    };

    update(0);
  }, [prod]);

  if (!prod) return <div>Загрузка...</div>;

  return (
    <div className="container my-4">
      {/* хлебные крошки */}
      <nav className="breadcrumb mb-4">
        <Link to="/">Главная</Link><span>/</span>
        <Link to="/catalog">Каталог</Link><span>/</span>
        <span className="active">{prod.category.name}</span>
      </nav>

      <div className="product-row d-flex">
        {/* Галерея */}
        <div className="product-images d-flex">
          <div className="thumbnails-wrapper-vertical">
            <div className="thumbnails d-flex flex-column">
              {prod.images.map((img, i) => (
                <img
                  key={i}
                  ref={el => thumbsRef.current[i] = el}
                  src={img.image_url}
                  className={`thumb mb-2 ${i===0?'active':''}`}
                  alt=""
                  onClick={() => {
                    mainImgRef.current.src = prod.images[i].image_url;
                    thumbsRef.current.forEach((t,k) =>
                      t.classList.toggle('active', k === i)
                    );
                  }}
                  style={{ cursor:'pointer', width:60, height:60, objectFit:'cover' }}
                />
              ))}
            </div>
          </div>
          <div className="main-image-wrapper position-relative">
            <div className="zoom-container">
              <img ref={mainImgRef} src={prod.images[0].image_url} alt={prod.name} />
            </div>
            <button id="prev" className="carousel-btn prev">‹</button>
            <button id="next" className="carousel-btn next">›</button>
          </div>
        </div>

        {/* Инфо */}
        <div className="product-info col-md-6 ps-4">
          <h1 className="h3 fw-bold mb-3">{prod.name}</h1>
          <div className="text-primary fw-bold mb-4">{prod.price} ₽</div>
          <p><strong>Размеры:</strong> {prod.sizes || '—'}</p>
          <p><strong>Ткань:</strong> {prod.fabric || '—'}</p>
          <p><strong>Сезон:</strong> {prod.season || '—'}</p>

          {/* collapsible description */}
          <div
            className="description mb-2"
            style={{
              maxHeight: collapsed ?  '120px' : 'none',
              overflow:    'hidden',
              transition:  'max-height .3s ease'
            }}
            dangerouslySetInnerHTML={{
              __html: prod.description || 'Описание отсутствует.'
            }}
          />

          <button
            className="btn btn-sm btn-outline-secondary mb-4"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? 'Показать всё' : 'Свернуть'}
          </button>

          <a className="btn btn-primary btn-lg btn-block mt-3 btn-order-text">
            <i className="icon-shopping-cart"></i> Заказать
          </a>

        </div>
      </div>
    </div>
  );
}
