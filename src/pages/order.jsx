import { Helmet } from 'react-helmet-async';

import { OrdersView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function OrdersPage() {
    return (
        <>
            <Helmet>
                <title> Products | Minimal UI </title>
            </Helmet>

            <OrdersView />
        </>
    );
}

