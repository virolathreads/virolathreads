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
        className="single-slider"
        style={{
          position: "relative",
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
            width: "100%",
          }}
          animate={{
            x: [0, `-${sliderData.length * 100}%`],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 30,
          }}
        >
          {[
            ...sliderData, 
            ...sliderData, 
            ...sliderData, 
            ...sliderData, 
            ...sliderData
          ].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              style={{
                height: "100vh",
                maxHeight: "700px",
                width: "auto",
                marginRight: "1rem",
                flexShrink: 0,
                objectFit: "cover",
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
            padding: "2rem",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-9">
                <div className="hero__caption">
                  {/* <h1
                   style={{ fontSize: "70px" }}
                    // style={{
                    //   fontSize: "clamp(30px, 6vw, 60px)",
                    //   color: "white",
                    //   textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                    // }}
                  >
                    Style
                    <br />
                    That
                    <br />
                    Speaks
                  </h1> */}
                  {/* <a
                    href="/shop"
                    className="btn"
                    // style={{
                    //   pointerEvents: "auto",
                    //   backgroundColor: "white",
                    //   color: "black",
                    //   padding: "10px 20px",
                    //   textDecoration: "none",
                    //   borderRadius: "5px",
                    //   display: "inline-block",
                    //   marginTop: "20px",
                    // }}
                  >
                    SHOP NOW
                  </a> */}
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