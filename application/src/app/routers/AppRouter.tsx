import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ErrorPage } from '../../pages/error'
import { Layout } from '../../pages/layout'
import { MainPage } from '../../pages/main'
import { CatalogPage } from '../../pages/catalog'
import { AboutPage } from '../../pages/about'
import { ContactPage } from '../../pages/contact'
import { ProductPage } from '../../pages/product'
import { CartPage } from '../../pages/cart'

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: '/',
      element: <MainPage />
    },
    {
      path: '/catalog',
      element: <CatalogPage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/contacts',
      element: <ContactPage />
    },
    {
      path: '/catalog/:id',
      element: <ProductPage />
    },
    {
      path: '/cart',
      element: <CartPage />
    }
  ]
}])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}