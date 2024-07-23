import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

// Example navConfig
const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
    subitems: [
      {
        title: 'All Products',
        path: '/dashboard/products',
        icon: icon('ic_cart'),
      },
      {
        title: 'category',
        path: '/dashboard/products/category',
        icon: icon('ic_category'),
      },
      {
        title: 'attributes',
        path: '/dashboard/products/attributes',
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
    path: '/dashboard/order',
    icon: icon('ic_blog'),
    subitems: [
      {
        title: 'Order List',
        path: '/dashboard/order',
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
    path: '/dashboard/registered-farmers',
    icon: icon('ic_farmer'),
  },
  {
    title: 'Soil Testing',
    path: '/dashboard/soil-testing',
    icon: icon('ic_soil'),
  },
  // {
  //   title: 'Crop Doctor',
  //   path: '/dashboard/crop-doctor',
  //   icon: icon('ic_crop'),
  // },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Carbon credit',
    path: '/dashboard/carbon-credit',
    icon: icon('ic_carbon'),
  },
  // {
  //   title: 'Blogs/Crop Guide',
  //   path: '/dashboard/cropguide',
  //   icon: icon('ic_blog2'),
  // },
  // {
  //   title: 'Mobile app settings',
  //   path: '#',
  //   icon: icon('ic_settings'),
  // },
  // {
  //   title: 'Users',
  //   path: '#',
  //   icon: icon('ic_users'),
  // },
  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
