// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
// import { AppSidebar } from "@/components/ui/app-sidebar";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
