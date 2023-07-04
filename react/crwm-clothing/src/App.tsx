import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase.util';
import { setCurrentUser } from './store/user.action';

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

  return <RouterProvider router={router} />;
}

export default App;
