import { ReactNode, createContext, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase.util';

import useCategoriesReducer, {
  CATEGORIES_ACTION_TYPES,
  CATEGORIES_INITIAL_STATE,
} from '../reducers/categories.reducer';

interface Props {
  children: ReactNode;
}

export const CategoriesContext = createContext(CATEGORIES_INITIAL_STATE);

export const CategoriesProvider = ({ children }: Props) => {
  const [{ categoriesMap }, dispatch] = useCategoriesReducer();

  useEffect(() => {
    const getCategoriesMap = async () => {
      dispatch(
        CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP,
        await getCategoriesAndDocuments()
      );
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
