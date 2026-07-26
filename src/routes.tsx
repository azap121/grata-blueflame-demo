import { createBrowserRouter, Navigate } from 'react-router-dom';
import GrataApp from './app';

export const router = createBrowserRouter(
  [
    { path: '/', element: <GrataApp /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ],
  { basename: process.env.BASE_PATH || '/' },
);
