// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext';

const Chevron = ({ open }) => (
  <svg
    className="chevron-icon"
    viewBox="0 0 24 24"
    style={{ transform: open ? 'rotate(180deg)' : undefined }}
  >
    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { wishlist }                = useWishlist();

  // Escape: close menus
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // fetch categories for "Каталог" submenu
  useEffect(() => {
    fetch('/backend/api/categories/?parent__isnull=true')
      .then(res => res.json())
      .then(data => {
        const roots = Array.isArray(data) ? data : data.results;
        setCategories(
            roots.map(cat => ({
            label: cat.name,
            href:  `/catalog?category=${cat.slug}`,
            children: cat.children.map(c => ({
                label: c.name,
                href:  `/catalog?category=${c.slug}`
            }))
            }))
        )});
        });

  // build full menu
  const MENU = [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog', children: categories },
    { label: 'О нас', href: '/about' },
    { label: 'Контакты', href: '/contact' },
  ];

  return (
    <div className="site-navbar bg-white py-2">
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* logo */}
          <div className="logo">
            <div className="site-logo">
              <a href="/" className="js-logo-clone">
                Nurzat
              </a>
            </div>
          </div>

          {/* desktop nav */}
          <DesktopNav menu={MENU} />

          {/* icons */}
          <div className="icons">
            <Link to="/wishlist" className="icons-btn d-inline-block bag">
              <span className="icon-heart-o" />
              {/* если есть хотя бы один товар — показываем счётчик */}
              {wishlist.length > 0 && (
                <span className="number">{wishlist.length}</span>
              )}
            </Link>
            <a
              className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"
              onClick={() => setMenuOpen(true)}
            >
              <span className="icon-menu" />
            </a>
          </div>
        </div>
      </div>

      {/* mobile */}
      <MobileOverlay show={menuOpen} onClose={() => setMenuOpen(false)} />
      <MobileMenu show={menuOpen} onClose={() => setMenuOpen(false)} menu={MENU} />
    </div>
  );
}

/* ===== SEARCH ===== */
function SearchOverlay({ open, onClose }) {
  const boxRef = useRef(null);
  useEffect(() => {
    const handler = e => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="search-wrap active">
      <div className="container" ref={boxRef}>
        <a
          className="search-close js-search-close"
          onClick={e => {
            e.preventDefault();
            onClose();
          }}
        >
          <span className="icon-close2" />
        </a>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            className="form-control"
            placeholder="Search keyword and hit enter..."
          />
        </form>
      </div>
    </div>
  );
}

/* ===== DESKTOP ===== */
function DesktopNav({ menu }) {
  return (
    <div className="main-nav d-none d-lg-block">
      <nav className="site-navigation text-right text-md-center" role="navigation">
        <ul className="site-menu js-clone-nav d-none d-lg-block">
          {menu.map((item, i) => (
            <DesktopItem key={i} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

function DesktopItem({ item }) {
  const hasChildren = !!item.children?.length;
  return (
    <li className={hasChildren ? 'has-children' : ''}>
      <NavLink to={item.href} className={({ isActive }) => (isActive ? 'active' : undefined)}>
        {item.label}
      </NavLink>
      {hasChildren && (
        <ul className="dropdown">
          {item.children.map((c, idx) => (
            <DesktopItem key={idx} item={c} />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ===== MOBILE ===== */
function MobileOverlay({ show, onClose }) {
  return <div className={`mobile-overlay ${show ? 'show' : ''}`} onClick={onClose} />;
}

function MobileMenu({ show, onClose, menu }) {
    const location = useLocation();
    useEffect(() => {
    if (show) onClose();
  }, [location.pathname]);
  return (
    <div className={`site-mobile-menu ${show ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
      <div className="site-mobile-menu-header">
        <a className="site-mobile-menu-close mt-3" onClick={onClose}>
          <span className="icon-close2" />
        </a>
      </div>
      <div className="site-mobile-menu-body">
        <ul className="site-nav-wrap">
          {menu.map((item, i) => (
            <MobileItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileItem({ item }) {
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    if (!open) {
      setMaxH(0);
      return;
    }
    const el = ref.current;
    setMaxH(el?.scrollHeight || 0);
    const ro = new ResizeObserver(() => setMaxH(el.scrollHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  if (!hasChildren) {
    return (
      <li>
        <Link to={item.href}>{item.label}</Link>
      </li>
    );
  }

  return (
    <li className="has-children">
      <div className="row-link">
        <Link to={item.href}>{item.label}</Link>
        <button
          className="arrow-btn"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(o => !o);
          }}
        >
          <Chevron open={open} />
        </button>
      </div>
      <ul
        ref={ref}
        className="dropdown pl-3"
        style={{
          maxHeight: open ? maxH : 0,
          overflow: 'hidden',
          transition: 'max-height .25s ease',
        }}
      >
        {item.children.map((c, idx) => (
          <MobileItem key={idx} item={c} />
        ))}
      </ul>
    </li>
  );
}
