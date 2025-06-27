import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { SpeedInsights } from '@vercel/speed-insights/next';
import router from './router';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
        <SpeedInsights />
    </StrictMode>
);
