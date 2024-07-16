import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const CategoryPage = lazy(() => import('src/pages/category'));
export const AttributesPage = lazy(() => import('src/pages/attributes'));
export const OrderPage = lazy(() => import('src/pages/order'));
export const FarmerPage = lazy(() => import('src/pages/farmer'));
export const SoilPage = lazy(() => import('src/pages/soilTest'));
export const CropPage = lazy(() => import('src/pages/crop'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        // { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/category', element: <CategoryPage /> },
        { path: 'products/attributes', element: <AttributesPage /> },
        { path: 'registered-farmers', element: <FarmerPage /> },
        { path: 'soil-testing', element: <SoilPage /> },
        { path: 'crop-doctor', element: <CropPage /> },
        { path: 'order', element: <OrderPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
