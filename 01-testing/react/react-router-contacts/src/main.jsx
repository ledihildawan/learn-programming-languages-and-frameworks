import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { action as destroyAction } from './routes/destroy.jsx';

import Root, {
  action as rootAction,
  loader as rootLoader,
} from './routes/root.jsx';

import Contact, {
  action as contactAction,
  loader as contactLoader,
} from './routes/contact.jsx';

import EditContact, {
  action as editAction,
} from "./routes/edit";

import Index from './routes/index.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from './error-page.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    action: rootAction,
    loader: rootLoader,
    element: <Root />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            action: contactAction,
            loader: contactLoader,
            element: <Contact />,
          },
          {
            path: "contacts/:contactId/edit",
            action: editAction,
            loader: contactLoader,
            element: <EditContact />,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
          },
        ]
      }
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
