import { Helmet } from 'react-helmet-async';

import { CarbonView } from 'src/sections/carbonCredit/view';

// ----------------------------------------------------------------------

export default function CarbonPage() {
    return (
        <>
            <Helmet>
                <title> Carbon Credit | AgriGuard </title>
            </Helmet>

            <CarbonView />
        </>
    );
}
