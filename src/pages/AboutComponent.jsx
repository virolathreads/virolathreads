import React from "react";

function AboutComponent() {
  return (
    <section
      class="collection section-bg2 section-padding30 section-over1 ml-15 mr-15"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582475/1731158072971_je7sxd.png)",
      }}
    >
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-9">
            <div class="single-question text-center">
              <h2
                class="wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".1s"
              >
                collection houses our first-ever
              </h2>
              <a
                href="/about"
                className="btn wow fadeInUp"
                data-wow-duration="2s"
                data-wow-delay=".4s"
              >
                About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutComponent;
