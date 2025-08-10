// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div
        className="position-relative text-center py-4"
        style={{ background: '#000' }}
      >
        <p className="mb-2 text-white">© 2025 NURZAT. Все права защищены</p>
        <div className="d-flex justify-content-center">
          <a
            href="https://wa.me/996507633332?text=Здравствуйте!"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 text-white"
            style={{ fontSize: '28px' }}
          >
            <span className="icon-whatsapp" />
          </a>
          <a
            href="https://instagram.com/nurzat_clothes"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 text-white"
            style={{ fontSize: '28px' }}
          >
            <span className="icon-instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
