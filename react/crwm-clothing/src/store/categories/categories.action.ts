import CATEGORIES_ACTION_TYPES from './categories.action-types';

import createAction from '../../utils/create-action.util';

export const setCategoriesMap = (categories) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categories);
