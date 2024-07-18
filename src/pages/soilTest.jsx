import { Helmet } from 'react-helmet-async';

import { SoilView } from 'src/sections/soil/view';

// ----------------------------------------------------------------------

export default function SoilPage() {
    return (
        <>
            <Helmet>
                <title> Products | Minimal UI </title>
            </Helmet>

            <SoilView />
        </>
    );
}
