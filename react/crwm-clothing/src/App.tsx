import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCategoriesAndDocuments,
} from './utils/firebase.util';
import { setCurrentUser } from './store/user/user.action';
import { setCategoriesMap } from './store/categories/categories.action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      dispatch(setCategoriesMap(await getCategoriesAndDocuments()));
    };

    getCategoriesMap();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
