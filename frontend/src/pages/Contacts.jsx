// src/pages/Contacts.jsx
import React from 'react';
import 'aos/dist/aos.css';

export default function Contacts() {
  return (
    <section className="site-section">
      <div className="container">
        <div className="row gx-5">
          {/* Левая колонка: карта */}
          <div className="col-md-6 mb-4" data-aos="fade-right">
            <iframe
              title="Nurzat Fashion Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1227.0297138945832!2d74.5893377723051!3d42.88464297956973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec81cfc14788d%3A0x4758b73fa9a963ae!2zNjAg0YPQuy4g0KLQsNGI0LrQtdC90YLRgdC60LDRjywg0JHQuNGI0LrQtdC6!5e0!3m2!1sru!2skg!4v1753427440553!5m2!1sru!2skg"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          {/* Правая колонка: контакты */}
          <div className="col-md-6" data-aos="fade-left">
            <h2 className="mb-4">Контакты</h2>
            <p>
              Мы — производственная фабрика Nurzat, специализируемся на полном цикле создания одежды: от разработки эскиза и паттернов до готового изделия. Мы открыты к сотрудничеству: готовы к оптовым заказам, индивидуальному брендингу и контрактному производству под ваши задачи.
            </p>

            {/* Социальные иконки */}
            <div className="mb-5 contact-social">
            <a href="https://instagram.com/nurzat_clothes"><span className="icon-instagram" /></a>
            <a href="https://wa.me/996507633332?text=Здравствуйте!"><span className="icon-whatsapp" /></a>
            <a href="#"><span className="icon-telegram" /></a>
            </div>


            {/* Для покупки в торговой точке */}
            <h5 className="mb-3">Связать с нами:</h5>
            <ul className="list-unstyled mb-5">
              <li className="mb-3 d-flex align-items-start">
                <span className="icon-phone me-3" style={{ fontSize: '1.5rem' }} />
                <div>+996 507 633 332</div>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <span className="icon-clock-o me-3" style={{ fontSize: '1.5rem' }} />
                <div>Пн — Пт: 8:00 — 19:00</div>
              </li>
              <li className="d-flex align-items-start">
                <span className="icon-map-marker me-3" style={{ fontSize: '1.5rem' }} />
                <div>Ташкентская 60</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
