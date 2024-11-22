// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PropTypes from "prop-types";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ScrollToTop from "./ScrollToTop";
import LoginHeader from "./LoginHeader";
import Footer from "./Footer";

// import { AppSidebar } from "@/components/ui/app-sidebar";
export default function LoginLayout({ children }) {
  return (
    <>
      <LoginHeader />
      {children}
      <Footer />
    </>
  );
}
LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
