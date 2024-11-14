import { Outlet } from "react-router-dom";
// import Footer from "../components/layouts/Footer";
// import Navbar from "../components/layouts/Navbar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "@/pages/ErrorPage";


const Root = () => {
  return (
    <>
      {/* <Navbar /> */}
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Outlet />
      </ErrorBoundary>
      {/* <Footer /> */}
    </>
  );
};

export default Root;
