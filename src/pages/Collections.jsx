import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function Collections() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/shop`);
  };
  return (
    <div class="popular-items  pt-50">
      <motion.h2
        style={{
          textAlign: "center",
          fontSize: "3.5rem",
          color: "#65867c",
          padding: "3rem",
          fontWeight: "light",
          marginBottom: "2rem",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Discover
      </motion.h2>

      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="single-popular-items mb-50 text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".1s"
              onClick={() => handleClick("bridal")}
            >
              <div class="popular-img">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733762524/image0_2_ncv4ht.jpg"
                  alt=""
                />
                <div class="img-cap">
                  <span>Modern</span>
                </div>
                {/* <div class="favorit-items">
                  <a href="/shop" class="btn">
                    Shop Now
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="single-popular-items mb-50 text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".2s"
              onClick={() => handleClick("modern")}
            >
              <div class="popular-img">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733762531/image0_jyb7u2.jpg"
                  alt=""
                />
                <div class="img-cap">
                  <span>Afro </span>
                </div>
                {/* <div class="favorit-items">
                  <a href="/shop" class="btn">
                    Shop Now
                  </a>
                </div> */}
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="single-popular-items mb-50 text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".6s"
              onClick={() => handleClick("afro")}
            >
              <div class="popular-img">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733947108/image1_eozutd.jpg"
                  alt=""
                />
                <div class="img-cap">
                  <span>Fusion </span>
                </div>
                {/* <div class="favorit-items">
                  <a href="/shop" class="btn">
                    Shop Now
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="single-popular-items mb-50 text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".6s"
              onClick={() => handleClick()}
            >
              <div class="popular-img">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1733762819/image1_gwehh4.jpg"
                  alt=""
                />
                <div class="img-cap">
                  <span>All Collections </span>
                </div>
                {/* <div class="favorit-items">
                  <a href="/shop" class="btn">
                    Shop Now
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center  hover:text-[#fff]">
          <div class="room-btn my-20">
            <a href="/shop" class="border-btn boxed-btn">
              Browse More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
