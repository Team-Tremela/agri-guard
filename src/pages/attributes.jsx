import { Helmet } from 'react-helmet-async';

import { AttributesView } from 'src/sections/attributes/view';

// ----------------------------------------------------------------------

export default function AttributesPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <AttributesView />
    </>
  );
}
