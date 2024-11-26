import React from "react";
import { motion } from "framer-motion";

// Example image data
const sliderData = [
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731581263/1731144144261_d97xed.png",
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582471/1731157979871_wnnwiv.png",
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582470/1731157997456_ym91xn.png",
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582477/1731158528565_o6lahu.png",
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582480/1731159377755_ccditd.png",
];

const HeroSlider = () => {
  return (
    <div className="slider-active dot-style">
      <div
        className="single-slider mt-5"
        style={{
          position: "relative",
          // width: "100%",
          // height: "100vh",
          overflow: "hidden",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Scrolling Images */}
        <motion.div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
          }}
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {sliderData.concat(sliderData).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              style={{
                height: "80vh",
                marginRight: "1rem",
                flexShrink: 0,
              }}
            />
          ))}
        </motion.div>

        {/* Text Overlay */}
        <div
          className="hero-text-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
           // Subtle white overlay for better readability
            padding: "2rem",
          }}
        >
           <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-8 col-lg-9">
                <div class="hero__caption">
                  <h1  style={{ fontSize: "60px" }}>
                    Style
                    <br />
                    That
                    <br />
                    Speaks
                  </h1>
                  <a href="/shop" class="btn">
                   SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
