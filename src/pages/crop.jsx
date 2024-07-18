import { Helmet } from 'react-helmet-async';

import { CropView } from 'src/sections/crop/view';

// ----------------------------------------------------------------------

export default function CropPage() {
    return (
        <>
            <Helmet>
                <title> Products | Minimal UI </title>
            </Helmet>

            <CropView />
        </>
    );
}
