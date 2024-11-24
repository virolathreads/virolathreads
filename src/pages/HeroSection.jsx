import React from "react";
import { motion } from "framer-motion";

function HeroSection() {
  const images = [
    "url('https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731581267/1731155539007_lx9y6d.png')",
    "url('https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731581264/1731153922634_2_yl70w7.png')",
    "url('https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582470/1731157997456_ym91xn.png')",
    "url('https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731581268/1731155374791_xaknvu.png')",
    "url('https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582480/1731159377755_ccditd.png')",
    "url('https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582708/1731154020032_b5uob4.png')",
    "url('https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582706/1731153957887_ymaiqj.pngg')",
    "url('https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582682/1731141456029_njzecm.png')",

    // "url('/path-to-image4.jpg')",
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Automatically switch images every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Switch every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div class="slider-active dot-style">
      <motion.div
        class="single-slider hero-overly slider-height d-flex align-items-center"
        style={{
          height: "180vh",
          backgroundSize: "cover",
          // backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          color: "white",
        }}
        animate={{ backgroundImage: images[currentImageIndex] }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-8 col-lg-9">
              <div class="hero__caption">
                <h1>
                  Style
                  <br />
                  That
                  <br />
                  Speaks
                </h1>
                <a href="/shop" class="btn">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="single-slider slider-bg3 hero-overly slider-height d-flex align-items-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-8 col-lg-9">
              <div class="hero__caption">
                <h1>
               Craft
                  <br />
               for
                  <br />
                  Confidence
                </h1>
                <a href="/shop" class="btn">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      </motion.div>
    </div>
  );
}

export default HeroSection;
