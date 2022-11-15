import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//COMPONENTS
import App from './App';

//STYLES
import './index.css';

//PAGES
import ErrorPage from './pages/ErrorPage';
import FavioritesCardList from './pages/FavioritesCardList';
import MainPage from './pages/MainPage';

//CTX
import { FavoriteContextProvider } from './store/fovorite-contex';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/fav', element: <FavioritesCardList /> },
      { path: '/', element: <MainPage /> },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <FavoriteContextProvider>
      <RouterProvider router={router} />
    </FavoriteContextProvider>
  </React.StrictMode>
);
