import { createBrowserRouter } from 'react-router-dom';

import MainLayout from './layouts/main.layout';

import HomePage from './pages/home/home.page';
import AuthenticationPage from './pages/authentication/authentication.page';
import ShopPage from './pages/shop/shop.page';
import CheckoutPage from './pages/checkout/checkout.page';
import CategoryPage from './pages/category/category.page';

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage />, index: true },
      { path: '/auth', element: <AuthenticationPage /> },
      {
        path: '/shop',
        children: [
          { path: '/shop', element: <ShopPage />, index: true },
          { path: '/shop/:category', element: <CategoryPage /> },
        ],
      },
      { path: '/checkout', element: <CheckoutPage /> },
    ],
  },
]);

export { router };
