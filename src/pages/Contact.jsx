import React from "react";
import Layout from "../layouts/Layout";

function Contact() {
  return (
    <Layout>
      <main>
        <div class="page-notification page-notification2">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb justify-content-center">
                    <li class="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="/contact">Contact</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section class="contact-section">
          <div class="container">
            {/* <div class="d-none d-sm-block mb-5 pb-4">
                   
                  
                    
                </div> */}
            <div class="row">
              <div class="col-12">
                <h2 class="contact-title">Get in Touch</h2>
              </div>
              <div class="col-lg-8">
                <form
                  class="form-contact contact_form"
                  action="contact_process.php"
                  method="post"
                  id="contactForm"
                  novalidate="novalidate"
                >
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <textarea
                          class="form-control w-100"
                          name="message"
                          id="message"
                          cols="30"
                          rows="9"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter Message'"
                          placeholder=" Enter Message"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <input
                          class="form-control valid"
                          name="name"
                          id="name"
                          type="text"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter your name'"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <input
                          class="form-control valid"
                          name="email"
                          id="email"
                          type="email"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter email address'"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <input
                          class="form-control"
                          name="subject"
                          id="subject"
                          type="text"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter Subject'"
                          placeholder="Enter Subject"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <button
                      type="submit"
                      class="button button-contactForm boxed-btn"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
              <div class="col-lg-3 offset-lg-1">
                <div class="media contact-info">
                  <span class="contact-info__icon">
                    <i class="ti-home"></i>
                  </span>
                  <div class="media-body">
                    <a href="https://www.google.com/maps/dir/6.4271817,3.470544/12a+A.J.+Marinho+Dr,+Victoria+Island,+Lagos+106104,+Lagos/@6.4305787,3.4096684,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x103bf53b1e6008a9:0xf895fd49e3280d90!2m2!1d3.4323231!2d6.4266543?entry=ttu&g_ep=EgoyMDI0MTExMS4wIKXMDSoASAFQAw%3D%3D">
                      <h3>12a A.J Marinho Drive Victoria Island Lagos</h3>
                    </a>
                  </div>
                </div>
                <div class="media contact-info">
                  <span class="contact-info__icon">
                    <i class="ti-tablet"></i>
                  </span>
                  <div class="media-body">
                    <a href="tel:+2347066657908">
                      <h3>07066657908</h3>
                    </a>

                    <p>Mon to Fri 9am to 6pm</p>
                  </div>
                </div>
                <div class="media contact-info">
                  <span class="contact-info__icon">
                    <i class="ti-email"></i>
                  </span>
                  <div class="media-body">
                    <a href="mailto:virolathreads@gmail.com">
                      <h3>virolathreads@gmail.com</h3>
                    </a>

                    <p>Send us your query anytime!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Contact;
