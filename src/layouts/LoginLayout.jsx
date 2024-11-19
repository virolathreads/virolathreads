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

// import { AppSidebar } from "@/components/ui/app-sidebar";
export default function LoginLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-10 shrink-0 items-center gap-2 border-b">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>

          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
