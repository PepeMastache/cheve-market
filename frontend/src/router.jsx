import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const LandingAfiliados = lazy(() => import('./pages/Landing_Afiliados'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<p>Cargando...</p>}><Home /></Suspense>,
  },
  {
    path: '/shop',
    element: <Suspense fallback={<p>Cargando...</p>}><Shop /></Suspense>,
  },
  {
    path: '/shop/:slug',
    element: <Suspense fallback={<p>Cargando producto...</p>}><ProductPage /></Suspense>,
  },
  {
    path: '/afiliados',
    element: <Suspense fallback={<p>Cargando...</p>}><LandingAfiliados /></Suspense>, // ✅
  }
])
