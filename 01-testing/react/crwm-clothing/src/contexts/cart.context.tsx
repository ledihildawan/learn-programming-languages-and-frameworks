import { createContext, useEffect, ReactNode } from 'react';

import useCartReducer, {
  CART_INITIAL_STATE,
  CART_ACTION_TYPES,
} from '../reducers/cart.reducer';

interface Props {
  children: ReactNode;
}

function controlQuantity(type, cartItem) {
  return {
    ...cartItem,
    quantity: type === 'inc' ? cartItem.quantity + 1 : cartItem.quantity - 1,
  };
}

function isCartItemExists(cartItems, product) {
  return cartItems.find((cartItem) => cartItem.id === product.id);
}

function addCartItem(cartItems, productToAdd) {
  if (isCartItemExists(cartItems, productToAdd)) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? controlQuantity('inc', cartItem)
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

function removeCartItem(cartItems, productToRemove) {
  const product = isCartItemExists(cartItems, productToRemove);

  if (product.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? controlQuantity('dec', cartItem)
      : cartItem
  );
}

function clearCartItem(cartItems, productToClear) {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
}

function useCart() {
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useCartReducer();

  useEffect(() => {
    const newCartCount = cartItems.reduce((n, { quantity }) => n + quantity, 0);
    const newCartTotal = cartItems.reduce(
      (n, { price, quantity }) => n + price * quantity,
      0
    );

    dispatch(CART_ACTION_TYPES.SET_CART_COUNT, newCartCount);
    dispatch(CART_ACTION_TYPES.SET_CART_TOTAL, newCartTotal);
  }, [cartItems]);

  return {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    dispatch,
  };
}

export const CartContext = createContext(CART_INITIAL_STATE);

export function CartProvider({ children }: Props) {
  const { cartItems, cartCount, cartTotal, isCartOpen, dispatch } = useCart();

  const addItemToCart = (productToAdd) => {
    dispatch(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      addCartItem(cartItems, productToAdd)
    );
  };

  const setIsCartOpen = () => {
    dispatch(CART_ACTION_TYPES.SET_IS_CART_OPEN, !isCartOpen);
  };

  const removeItemToCart = (cartItemToRemove) => {
    dispatch(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      removeCartItem(cartItems, cartItemToRemove)
    );
  };

  const clearItemFromCart = (cartItemToClear) => {
    dispatch(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      clearCartItem(cartItems, cartItemToClear)
    );
  };

  const value = {
    cartCount,
    cartItems,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
