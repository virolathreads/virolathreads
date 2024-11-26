import Layout from "../layouts/Layout";
import PreLoader from "@/lib/PreLoader";
import HeroSection from "./HeroSection";
import Photos from "../components/Photos";
import Services from "../components/Services";
import Collections from "./Collections";
import AboutComponent from "./AboutComponent";
import LatestBlog from "@/components/LatestBlog";
import Testimonials from "@/components/Testimonials";
import EmbeddedWixEvents from "./EmbeddedWixEvents";
import EventCard from "./EventCard";
import HeroSlider from "@/components/HeroSlider";

function Index() {
  return (
    <div class="full-wrapper">
      <Layout>
        {/* <PreLoader /> */}
        <main>
          <div class="container-fluid">
            <div class="slider-area">
              {/* <HeroSection /> */}
              <HeroSlider />
            </div>
          </div>

          {/* <EmbeddedWixEvents /> */}
          <Collections />
          <EventCard />
          <Services />
          <AboutComponent />
          <Testimonials />
          <LatestBlog />
          {/* <Photos /> */}
        </main>
      </Layout>
    </div>
  );
}

export default Index;
