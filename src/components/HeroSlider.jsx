import React from "react";
import { motion } from "framer-motion";

// Example image data
// const sliderData = [
//   "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731581263/1731144144261_d97xed.png",
//   "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582471/1731157979871_wnnwiv.png",
//   "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582470/1731157997456_ym91xn.png",
//   "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582477/1731158528565_o6lahu.png",
//   "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582480/1731159377755_ccditd.png",
// ];

const sliderData = [
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733947125/image3_zawqfo.jpg",
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733947104/image0_ileal7.jpg",
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733762531/image0_jyb7u2.jpg",
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733947126/image4_wy1bxh.jpg",

  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733947127/image2_h1ey7m.jpg",
  "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733762819/image1_gwehh4.jpg",
  // "https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733947108/image1_eozutd.jpg",
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
            ...sliderData,
          ].map((image, index) => (
            <motion.img
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
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                ease: "easeInOut",
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
          {/* You can add overlay content here */}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
