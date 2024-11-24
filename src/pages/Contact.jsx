import React, { useState } from "react";
import Layout from "../layouts/Layout";
import Swal from "sweetalert2";

function Contact() {
  const [fields, setFields] = useState("");
  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const sendFeedback = (templateId, variables) => {
    setLoad(true);
    window.emailjs
      .send("service_av5jfrg", templateId, variables)
      .then((res) => {
        setLoad(false);
        setFields({ name: "", email: "", message: "" });
        Swal.fire({
          title: "Successful!",
          text: "We have recieved your message. Our team will contact you within 24 hours! Thank you.",
          icon: "success",
          confirmButtonColor: "#65867c",
        });
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) => {
        setLoad(false);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong" + err.message,
          icon: "error",
          confirmButtonColor: "#65867c",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateId = "template_qexpy1f";
    const variables = {
      message: fields.message,
      from_name: fields.name,
      reply_to: fields.email,
      to_name: fields.phone,
    };
    sendFeedback(templateId, variables);
  };
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
                <h2 class="contact-title text-left">Get in Touch</h2>
              </div>
              <div class="col-lg-8">
                <form class="form-contact contact_form" onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <input
                          class="form-control valid"
                          name="name"
                          onChange={handleChange}
                          id="name"
                          type="text"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter Your Name'"
                          placeholder="Enter your Name"
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
                          onChange={handleChange}
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter Email Address'"
                          placeholder="Enter Email Address"
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <textarea
                          class="form-control w-100"
                          name="message"
                          id="message"
                          onChange={handleChange}
                          cols="30"
                          rows="9"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Enter Message'"
                          placeholder=" Enter Message"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    {load ? (
                      <button
                        type="submit"
                        disabled
                        class="button button-contactForm boxed-btn"
                      >
                        Submitting
                      </button>
                    ) : (
                      <button
                        type="submit"
                        class="button button-contactForm boxed-btn"
                      >
                        Send
                      </button>
                    )}
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
