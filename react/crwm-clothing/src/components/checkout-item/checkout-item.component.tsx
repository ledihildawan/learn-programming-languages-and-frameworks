import './checkout-item.styels.scss';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

export default function CheckoutItem({ cartItem }) {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={() => removeItemToCart(cartItem)}>
          &#10094;
        </span>
        <span>{quantity}</span>
        <span className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </span>
      </span>
      <span className="price">{price}</span>
      <span
        className="remove-button"
        onClick={() => clearItemFromCart(cartItem)}
      >
        &#120;
      </span>
    </div>
  );
}
