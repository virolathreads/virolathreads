import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ContactForm() {
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
    <div class="form-wrapper pt-8">
      <div class="row ">
        <div class="col-xl-12">
          <div class="small-tittle mb-30">
            <h2>Contact</h2>
          </div>
        </div>
      </div>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div class="row">
          <div class="col-lg-12">
            <div class="form-box user-icon mb-15">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-box email-icon mb-15">
              <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-box message-icon mb-15">
              <textarea
                name="message"
                id="message"
                onChange={handleChange}
                placeholder="Comment"
              ></textarea>
            </div>
            <div class="submit-info">
              {load ? (
                <button class="submit-btn2" type="submit" disabled>
                  Submitting
                </button>
              ) : (
                <button class="submit-btn2" type="submit">
                  Send Message
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
