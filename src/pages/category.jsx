import { Helmet } from 'react-helmet-async';

import { CategoryView } from 'src/sections/category/view';

// ----------------------------------------------------------------------

export default function CategoryPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <CategoryView />
    </>
  );
}
