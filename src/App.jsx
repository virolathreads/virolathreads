import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Root from "./roots/roots";
import { LoadingHelper } from "./lib/LoadingHelper";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import BlogDetails from "./pages/BlogDetails";
import Login from "./pages/Login";
import { BlogList } from "./pages/admin/BlogList";
import { Upload } from "./pages/admin/Upload";
import { Dashboard } from "./pages/admin/Dashboard";
import { ProductList } from "./pages/admin/ProductList";
import Privacy from "./pages/Privacy";

import Refund from "./pages/Refund";
import Terms from "./pages/Terms";
import EmbeddedWixEvents from "./pages/EmbeddedWixEvents";
import SizeChart from "./pages/SizeChart";
import { CreateAccount } from "./pages/users/CreateAccount";
import { UserLogin } from "./pages/users/UserLogin";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import AccountDetailsCard from "./pages/users/AccountDetailsCard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Index />
            </Suspense>
          ),
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "/shop",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Shop />
            </Suspense>
          ),
        },
        // {
        //   path: "/shop/:category",
        //   element: (
        //     <Suspense fallback={<LoadingHelper />}>
        //       <Shop />
        //     </Suspense>
        //   ),
        // },
        {
          path: "/products",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "/blog",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Blog />
            </Suspense>
          ),
        },
        {
          path: "/contact",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Contact />
            </Suspense>
          ),
        },

        {
          path: "/privacy",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Privacy />
            </Suspense>
          ),
        },
        {
          path: "/refund",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Refund />
            </Suspense>
          ),
        },
        {
          path: "/terms",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Terms />
            </Suspense>
          ),
        },

        {
          path: "/admin",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "/blog/:id",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <BlogDetails />
            </Suspense>
          ),
        },
        {
          path: "/product/:productId",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <ProductDetails />
            </Suspense>
          ),
        },
        {
          path: "/bloglist",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <BlogList />
            </Suspense>
          ),
        },
        {
          path: "/profile",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <AccountDetailsCard />
            </Suspense>
          ),
        },
        {
          path: "/size",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <SizeChart />
            </Suspense>
          ),
        },
        {
          path: "/productlist",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <ProductList />
            </Suspense>
          ),
        },
        {
          path: "/events",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <EmbeddedWixEvents />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "/createaccount",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <CreateAccount />
            </Suspense>
          ),
        },

        // {
        //   path: "/dashboard",
        //   element: (
        //     <Suspense fallback={<LoadingHelper />}>
        //       <UserLogin />
        //     </Suspense>
        //   ),
        // },
        {
          path: "/login",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <UserLogin />
            </Suspense>
          ),
        },

        {
          path: "*",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
