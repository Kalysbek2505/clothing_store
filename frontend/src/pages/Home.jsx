import React, { useState, useEffect } from 'react';

const BANNER_API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [hero, setHero] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BANNER_API}?is_active=true`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        // если DRF с пагинацией
        const list = Array.isArray(data) ? data : data.results;
        if (list.length > 0) setHero(list[0]);
        else setError('Нет активных баннеров');
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="site-blocks-cover" id="hero-banner-container">
        <div className="container text-center py-5">
          <p>Ошибка загрузки баннера: {error}</p>
        </div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="site-blocks-cover" id="hero-banner-container">
        <div className="container text-center py-5">
          <p>Загрузка баннера…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <div
        className="site-blocks-cover"
        data-aos="fade"
        id="hero-banner-container"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 ml-auto order-md-2 align-self-start">
              <div className="site-block-cover-content">
                <h1 id="hero-title">{hero.title}</h1>
                <p>
                  <a
                    href={hero.link}
                    className="btn btn-black rounded-0"
                    id="hero-link"
                  >
                    Купить
                  </a>
                </p>
              </div>
            </div>
            <div className="col-md-6 order-1 align-self-end">
              <img
                src={hero.image}
                alt={hero.title}
                className="img-fluid"
                id="hero-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="site-section py-2" id="categories">
        <div className="container-fluid px-0">
          <div className="row gx-0">
            <div className="col-md-6 pe-1">
              <div
                className="position-relative overflow-hidden"
                style={{ height: '520px' }}
              >
                <img
                  src="/images/categories pic1.jpg"
                  className="w-100 h-100 object-fit-cover"
                  alt="Клетчатые рубашки"
                />
                <div
                  className="position-absolute text-white p-5 d-flex flex-column justify-content-center"
                  style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,.45)',
                  }}
                >
                  <h2 className="text-uppercase fw-bold">Клетчатые рубашки</h2>
                  <p className="mb-4" style={{ maxWidth: '320px' }}>
                    Клетчатые рубашки для женщин. Идеальны для повседневного стиля.
                  </p>
                  <a
                    href="/women"
                    className="btn btn-outline-light align-self-start"
                  >
                    Выбрать
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="position-relative overflow-hidden"
                style={{ height: '520px' }}
              >
                <img
                  src="/images/white.jpg"
                  className="w-100 h-100 object-fit-cover"
                  alt="Белые рубашки"
                />
                <div
                  className="position-absolute text-white p-5 d-flex flex-column justify-content-center"
                  style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,.45)',
                  }}
                >
                  <h2 className="text-uppercase fw-bold">Белые рубашки</h2>
                  <p className="mb-4" style={{ maxWidth: '320px' }}>
                    Классические белые рубашки для женщин. Идеальны для любого случая.
                  </p>
                  <a
                    href="/catalog?category=belye-rubashki"
                    className="btn btn-outline-light align-self-start"
                  >
                    Выбрать
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        className="site-section p-0"
        id="about"
        style={{
          background: "url('/images/background1.jpg') center/cover no-repeat",
        }}
      >
        <div className="container py-5" data-aos="fade-up">
          <div className="row no-gutters justify-content-center">
            <div className="col-lg-10 bg-white shadow p-5">
              <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0 text-center text-md-left">
                  <img
                    src="/images/Nurzat_logo.png"
                    alt="NoorWear"
                    style={{ maxWidth: '240px' }}
                  />
                  <p className="text-muted mt-3">
                    Мусульманская одежда фабричного качества
                  </p>
                  <p>
                    Мы — производственная фабрика <strong>Nurzat</strong>, специализируемся на полном цикле создания одежды: от разработки эскиза и паттернов до готового изделия.
                  </p>
                  <a href="#" className="btn btn-black rounded-0 mt-2">
                    Подробнее
                  </a>
                </div>
                <div className="col-md-6 ps-1 text-center text-md-left">
                  <h3 className="text-uppercase mb-3">О компании</h3>
                  <span
                    className="icon-home"
                    style={{ fontSize: '48px', color: '#333' }}
                  />
                  <p className="mt-3">
                      Мы — производственная фабрика <strong>Nurzat</strong>, специализируемся на полном цикле создания одежды: от разработки эскиза и паттернов до готового изделия.
                  </p>
                  <a href="/catalog" className="btn btn-outline-dark mt-2">
                    Каталог
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
