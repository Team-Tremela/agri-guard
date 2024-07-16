import { Helmet } from 'react-helmet-async';

import { FarmerView } from 'src/sections/farmer/view';

// ----------------------------------------------------------------------

export default function FarmerPage() {
    return (
        <>
            <Helmet>
                <title> Products | Minimal UI </title>
            </Helmet>

            <FarmerView />
        </>
    );
}
