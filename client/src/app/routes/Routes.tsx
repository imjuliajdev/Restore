import HomePage from "../../features/home/HomePage";

import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import BlogPage from "../../features/blog/BlogPage";
import BlogPostDetails from "../../features/blog/BlogPostDetails";
import ProductDetails from "../../features/catalog/ProductDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'blog', element: <BlogPage />},
            {path: 'blog/:id', element: <BlogPostDetails />},      
        ]
    }
]);