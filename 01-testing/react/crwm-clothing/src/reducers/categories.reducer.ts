import useReducerUtil from '../utils/use-reducer.util';

export const CATEGORIES_INITIAL_STATE = {
  categoriesMap: {},
};

export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES_MAP: 'SET_CATEGORIES_MAP',
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {
        categoriesMap: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in categoriesReducer`);
  }
};

function useCategoriesReducer() {
  return useReducerUtil(categoriesReducer, CATEGORIES_INITIAL_STATE);
}

export default useCategoriesReducer;
