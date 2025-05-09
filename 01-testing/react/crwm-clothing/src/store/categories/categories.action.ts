import CATEGORIES_ACTION_TYPES from './categories.action-types';

import createAction from '../../utils/create-action.util';

export const setCategories = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
