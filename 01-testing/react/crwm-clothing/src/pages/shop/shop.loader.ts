import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setCategories } from '../../store/categories/categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase.util';

function shopLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      dispatch(setCategories(await getCategoriesAndDocuments()));
    };

    getCategoriesMap();
  }, []);
}

export default shopLoader;
