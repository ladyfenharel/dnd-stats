// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'

import Root from './routes/root.jsx'
import ErrorPage from './error-page.jsx'
import Sidebar from './components/Sidebar.jsx'
import SpellList from './components/SpellList.jsx'
import SpellDetail from './components/SpellDetail.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Sidebar />,
      children: [
        {
          index: true,
          element: <SpellList />, // 👈 default route is the spell list
        },
        {
          path: "spells",
          element: <SpellList />,
        },
        {
          path: "spells/:slug",
          element: <SpellDetail />,
        },
      ],
    },    
  ],
  {
    basename: "/dnd-stats",
  }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
