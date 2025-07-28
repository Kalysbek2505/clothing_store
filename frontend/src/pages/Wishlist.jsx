// src/pages/Wishlist.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (!wishlist.length) {
    return (
      <div className="container my-5 text-center">
        <h2>В избранном пока пусто 😞</h2>
        <Link to="/catalog" className="btn btn-primary mt-3">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Моё избранное</h2>
      <div className="row">
        {wishlist.map(item => {
          // Теперь в item есть и цена, и картинки
          const imgUrl = item.images?.[0]?.image_url || '/images/model_5.png';
          const priceNum = Number(item.price);
          const priceDisplay = Number.isFinite(priceNum)
            ? `${priceNum.toFixed(2)} сом`
            : (item.price ?? '—');

          return (
            <div
              key={item.id}
              className="col-sm-6 col-lg-4 mb-4"
              data-aos="fade-up"
            >
              <div className="block-4 text-center border">
                <Link to={`/product/${item.slug}`}>
                  <img src={imgUrl} alt={item.name} className="img-fluid" />
                </Link>
                <div className="block-4-text p-4 d-flex flex-column">
                  <h3>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <p className="text-primary fw-bold mb-3">
                    {priceDisplay}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-danger mt-auto"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Убрать из избранного
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
