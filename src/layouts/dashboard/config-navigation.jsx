import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// Example navConfig
const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
    subitems: [
      {
        title: 'All Products',
        path: '/products',
        icon: icon('ic_cart'),
      },
      {
        title: 'category',
        path: '/products/category',
        icon: icon('ic_category'),
      },
      {
        title: 'attributes',
        path: '/products/attributes',
        icon: icon('ic_attributes'),
      },
      // {
      //   title: 'tax profile',
      //   path: '/products/tax-profile',
      //   icon: icon('ic_tax'),
      // },
    ],
  },
  {
    title: 'Order',
    path: '/order',
    icon: icon('ic_blog'),
    subitems: [
      {
        title: 'Order List',
        path: '/order',
        icon: icon('ic_cart'),
      },
      // {
      //   title: 'Customers',
      //   path: '/order/customers',
      //   icon: icon('ic_category'),
      // },
      {
        title: 'Reports',
        path: '/order/reports',
        icon: icon('ic_reports'),
      }
    ],
  },
  {
    title: 'Register Farmers',
    path: '/registered-farmers',
    icon: icon('ic_farmer'),
  },
  {
    title: 'Soil Testing',
    path: '/soil-testing',
    icon: icon('ic_soil_testing'),
  },
  {
    title: 'Crop Doctor',
    path: '/crop-doctor',
    icon: icon('ic_crop'),
  },
  {
    title: 'Login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
