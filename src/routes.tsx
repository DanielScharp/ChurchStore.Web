import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/auth/sign-in";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { SignUp } from "./pages/auth/sign-up";
import { Orders } from "./pages/app/orders/orders";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { NotFound } from "./pages/404";
import { Buy } from "./pages/app/buys/buy";
import { ClientHeaderLayout } from "./pages/_layouts/client-header";
import { Bag } from "./pages/app/bag/bag";

export const router = createBrowserRouter([

    {
        path: '/',
        element: <ClientHeaderLayout />,
        errorElement: <NotFound />,
        children: [
            {path: '/', element: <Buy />},
            {path: '/bag', element: <Bag />},
        ]
    },
    {
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            {path: '/dashboard', element: <Dashboard />},
            {path: '/orders', element: <Orders />},
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {path: '/sign-in', element: <SignIn />},
            {path: '/sign-up', element: <SignUp />},
        ]
    }
    
])