import Layout from "../layouts/Layout";
import PreLoader from "@/lib/PreLoader";
import HeroSection from "./HeroSection";
import Photos from "../components/Photos";
import Services from "../components/Services";
import Collections from "./Collections";
import AboutComponent from "./AboutComponent";
import LatestBlog from "@/components/LatestBlog";

function Index() {
  return (
    <div class="full-wrapper">
      <Layout>
        {/* <PreLoader /> */}
        <main>
          <div class="container-fluid">
            <div class="slider-area">
              <HeroSection />
            </div>
          </div>

          <Collections />
          <Services />
          <AboutComponent />
          <LatestBlog />
          {/* <Photos /> */}
        </main>
      </Layout>
    </div>
  );
}

export default Index;
