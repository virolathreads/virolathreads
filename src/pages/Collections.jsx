import React from "react";

function Collections() {
  return (
    <div class="popular-items  pt-50">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="single-popular-items mb-50 text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".1s"
            >
              <div class="popular-img">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582470/1731157997456_ym91xn.png"
                  alt=""
                />
                <div class="img-cap">
                  <span>Bridal</span>
                </div>
                <div class="favorit-items">
                  <a href="/shop" class="btn">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="single-popular-items mb-50 text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".2s"
            >
              <div class="popular-img">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731581262/1731143198289_2_imcc54.png"
                  alt=""
                />
                <div class="img-cap">
                  <span>Modern </span>
                </div>
                <div class="favorit-items">
                  <a href="/shop" class="btn">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="single-popular-items mb-50 text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".6s"
            >
              <div class="popular-img">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582683/1731141487560_tpoclu.png"
                  alt=""
                />
                <div class="img-cap">
                  <span>Afro </span>
                </div>
                <div class="favorit-items">
                  <a href="/shop" class="btn">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div
              class="single-popular-items mb-50 text-center wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".6s"
            >
              <div class="popular-img">
                <img
                  src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731581263/1731144144261_d97xed.png"
                  alt=""
                />
                <div class="img-cap">
                  <span>All Collections </span>
                </div>
                <div class="favorit-items">
                  <a href="/shop" class="btn">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="room-btn my-20">
            <a href="/shop" class="border-btn">
              Browse More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
