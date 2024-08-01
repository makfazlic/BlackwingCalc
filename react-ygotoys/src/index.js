import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Home from './Pages/Home'
import DrawProbability from './Pages/DrawProbability'
import Support from './Pages/Support'
import NotFound from './Pages/NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/support',
    element: <Support />,
  },
  {
    path: '/probability-calculator',
    element: <DrawProbability />,
  },
  
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter} />
  </React.StrictMode>
);