import './checkout.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

export default function CheckoutPage() {
  const { cartItems, cartTotal, removeItemToCart, addItemToCart } =
    useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">Product</div>
        <div className="header-block">Description</div>
        <div className="header-block">Quantity</div>
        <div className="header-block">Price</div>
        <div className="header-block">Remove</div>
      </div>

      {cartItems.map((cartItem) => (
        <CheckoutItem
          key={`checkout-item-${cartItem.id}`}
          cartItem={cartItem}
        />
      ))}

      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
}
