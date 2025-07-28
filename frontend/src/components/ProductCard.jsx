// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  // подключаем наш хук
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // проверяем, есть ли уже в избранном
  const inWishlist = isInWishlist(product.id);

  // картинки и цена
  const imgUrl = product.images?.[0]?.image_url || '/images/model_5.png';
  const priceNum = Number(product.price);
  const priceDisplay = Number.isFinite(priceNum)
    ? `${priceNum.toFixed(2)} сом`
    : (product.price ?? '—');

  // обработчик клика по сердечку
  const toggleWishlist = () => {
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
      <div className="block-4 text-center border position-relative">
        {/* кнопка лайка */}
        <button
          onClick={toggleWishlist}
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label={inWishlist ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <span className={inWishlist ? 'icon-heart' : 'icon-heart-o'} />
        </button>

        <Link to={`/product/${product.slug}`}>
          <img src={imgUrl} alt={product.name} className="img-fluid" />
        </Link>

        <div className="block-4-text p-4 d-flex flex-column">
          <h3 className='mb-3'>
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="text-primary font-weight-bold">
            {priceDisplay}
          </p>
        </div>
      </div>
    </div>
  );
}
