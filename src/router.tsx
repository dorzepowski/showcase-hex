import { createBrowserRouter, Navigate } from 'react-router-dom';
import BEEFApp from './pages/BEEFApp/BEEFApp.tsx';
import { Layout } from './pages/Layout/Layout.tsx';
import { BEEFView } from './pages/BEEFView/BEEFView.tsx';
import RawTxApp from './pages/RawTxApp/RawTxApp.tsx';
import { RawTxView } from './pages/RawTxView/RawTxView.tsx';
import BUMPApp from './pages/BUMPApp/BUMPApp.tsx';
import { BUMPView } from './pages/BUMPView/BUMPView.tsx';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/beef" />,
        },
        {
          path: 'beef/',
          element: <BEEFApp />,
          children: [
            {
              path: ':beef/',
              element: <BEEFView />,
            },
          ],
        },
        {
          path: 'rawtx/',
          element: <RawTxApp />,
          children: [
            {
              path: ':rawtx/',
              element: <RawTxView />,
            },
          ],
        },
        {
          path: 'bump/',
          element: <BUMPApp />,
          children: [
            {
              path: ':bump/',
              element: <BUMPView />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
