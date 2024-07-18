import { Helmet } from 'react-helmet-async';

import { CategoryView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function CategoryPage() {
  return (
    <>
      <Helmet>
        <title> Products | AgriGuard </title>
      </Helmet>

      <CategoryView />
    </>
  );
}
