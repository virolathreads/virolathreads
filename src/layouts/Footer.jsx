import React from "react";

export default function Footer() {
  return (
    <footer>
      <div class="footer-area footer-padding">
        <div class="container-fluid ">
          <div class="row d-flex justify-content-between">
            <div class="col-xl-3 col-lg-3 col-md-8 col-sm-8">
              <div class="single-footer-caption mb-10">
                <div class="single-footer-caption mb-10">
                  <div class="footer-logo mb-15 ml-10 pl-10">
                    <a href="/">
                      <img
                        src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731457917/ppxryvdv0xd6zjwoqah0.jpg"
                        className="w-40 "
                        alt="Logo"
                      />
                    </a>
                  </div>

                  <div class="footer-social">
                    <a href="#">
                      <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://bit.ly/sai4ull">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-4">
              <div class="single-footer-caption mb-50">
                <div class="footer-tittle">
                  <h4>Quick links</h4>
                  <ul>
                    <li>
                      <a href="/shop">Shop</a>
                    </li>
                    <li>
                      <a href="/about">About Us</a>
                    </li>
                    <li>
                      <a href="/contact">Contact Us</a>
                    </li>
                    {/* <li>
                      <a href="#">Privacy Policy</a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4">
              <div class="single-footer-caption mb-50">
                <div class="footer-tittle">
                  <h4>Get in touch</h4>
                  <ul>
                    <li>
                      <a href="tel:+2347066657908">07066657908</a>
                    </li>
                    <li>
                      <a href="mailto:virolathreads@gmail.com">
                        virolathreads@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="https://www.google.com/maps/dir/6.4271817,3.470544/12a+A.J.+Marinho+Dr,+Victoria+Island,+Lagos+106104,+Lagos/@6.4305787,3.4096684,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x103bf53b1e6008a9:0xf895fd49e3280d90!2m2!1d3.4323231!2d6.4266543?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D">
                        12a A.J Marinho Drive Victoria Island Lagos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom-area">
        <div class="container">
          <div class="footer-border">
            <div class="row d-flex align-items-center">
              <div class="col-xl-12 ">
                <div class="footer-copy-right text-center">
                  <p>Copyright &copy; 2019 All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
