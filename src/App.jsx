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
          path: "/blog/:id",
          element: (
            <Suspense fallback={<LoadingHelper />}>
              <BlogDetails />
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
