import React from "react";

function HeroSection() {
  return (
    <div class="slider-active dot-style">
      <div class="single-slider slider-bg1 hero-overly slider-height d-flex align-items-center">
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
      </div>

      <div class="single-slider slider-bg2 hero-overly slider-height d-flex align-items-center">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-8 col-lg-9">
              <div class="hero__caption">
                <h1>
                Comfort  
                  <br />
                  That
                  <br />
                  Lasts
                </h1>
                <a href="/shop" class="btn">
                  Shop Now
                </a>
              </div>
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
    </div>
  );
}

export default HeroSection;
