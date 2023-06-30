import { CartIconContainer, ShoppingIcon, CartCount } from './cart-icon.styles';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

export default function CartIconComponent() {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  return (
    <CartIconContainer
      onClick={() => setIsCartOpen((isCartOpen) => !isCartOpen)}
    >
      <ShoppingIcon />
      <CartCount>{cartCount}</CartCount>
    </CartIconContainer>
  );
}
