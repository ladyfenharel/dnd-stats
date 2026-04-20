import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SpellDetail from './pages/SpellDetail';
import SpellListDetail from './pages/SpellListDetail';
import ErrorPage from './error-page';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'spells/:slug', element: <SpellDetail /> },
      { path: 'spell-lists/:spellListId', element: <SpellListDetail /> },
    ],
  },
];

function routerOptionsFromBaseUrl() {
  const raw = import.meta.env.BASE_URL ?? '/';
  const basename = raw.endsWith('/') ? raw.slice(0, -1) : raw;
  if (!basename || basename === '') {
    return {};
  }
  return { basename };
}

export const router = createBrowserRouter(routes, routerOptionsFromBaseUrl());
