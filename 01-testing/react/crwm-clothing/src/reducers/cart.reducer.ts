import useReducerUtil from '../utils/use-reducer.util';

export const CART_INITIAL_STATE = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  addItemToCart: () => {},
  setIsCartOpen: () => {},
  removeItemToCart: () => {},
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  ADD_CART_ITEM: 'ADD_CART_ITEM',
  CLEAR_CART_ITEM: 'CLEAR_CART_ITEM',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return { ...state, cartCount: payload };
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return { ...state, cartTotal: payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

function useCartReducer() {
  return useReducerUtil(cartReducer, CART_INITIAL_STATE);
}

export default useCartReducer;
