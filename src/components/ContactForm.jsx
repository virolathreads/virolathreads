import React from "react";

export default function ContactForm() {
  return (
    <div class="form-wrapper pt-8">
      <div class="row ">
        <div class="col-xl-12">
          <div class="small-tittle mb-30">
            <h2>Contact</h2>
          </div>
        </div>
      </div>
      <form id="contact-form" action="#" method="POST">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-box user-icon mb-15">
              <input type="text" name="name" placeholder="Your name" />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-box email-icon mb-15">
              <input type="text" name="email" placeholder="Email address" />
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-box message-icon mb-15">
              <textarea
                name="message"
                id="message"
                placeholder="Comment"
              ></textarea>
            </div>
            <div class="submit-info">
              <button class="submit-btn2" type="submit">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
