import HomePage from "../../features/home/HomePage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import BlogPage from "../../features/blog/BlogPage";
import BlogPostDetails from "../../features/blog/BlogPostDetails";
import ProductDetails from "../../features/catalog/ProductDetails";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import CartPage from "../../features/cart/CartPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: '/catalog', element: <Catalog />},
            {path: '/catalog/:id', element: <ProductDetails />},
            {path: '/cart', element: <CartPage />},
            {path: '/checkout', element: <CheckoutPage />},
            {path: '/about', element: <AboutPage />},
            {path: '/contact', element: <ContactPage />},
            {path: '/blog', element: <BlogPage />},
            {path: '/blog/:slug', element: <BlogPostDetails />}, 
            {path: '/server-error', element: <ServerError />},
            {path: '/not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
]);