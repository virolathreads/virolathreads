import { BlogList } from "./BlogList";
import LoginLayout from "@/layouts/LoginLayout";

export function Dashboard() {
  return (
    <LoginLayout>
      <div className="flex flex-1 flex-col gap-4 p-4 bg-[#254f43]">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-[#ffffff]" />
          <div className="aspect-video rounded-xl bg-[#ffffff]" />
          <div className="aspect-video rounded-xl bg-[#ffffff]" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-[#ffffff] md:min-h-min"></div>
      </div>
    </LoginLayout>
  );
}
