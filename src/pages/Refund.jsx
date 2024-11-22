import Layout from "@/layouts/Layout";
import React from "react";

const Refund = () => {
  const containerStyle = {
    padding: "2rem",
    margin: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    color: "#000", // Set text color to black
    textAlign: "left", // Align text to the left
  };

  const headerStyle = {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#000",
  };

  const subHeaderStyle = {
    fontSize: "1.5rem",
    marginTop: "1.5rem",
    marginBottom: "1rem",
    color: "#000",
  };

  const listStyle = {
    paddingLeft: "1.5rem",
    marginBottom: "1rem",
  };

  const linkStyle = {
    color: "#000", // Text color black
    textDecoration: "none",
    fontWeight: "bold",
  };

  const contactItemStyle = {
    marginBottom: "0.5rem",
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h1 style={headerStyle}>Return and Refund Policy</h1>
        <p>Last updated: November 03, 2023</p>
        <p>Thank you for shopping at Virola Threads.</p>
        <p>
          If, for any reason, you are not completely satisfied with a purchase,
          we invite you to review our policy on refunds and returns.
        </p>
        <p>
          The following terms are applicable for any products that you purchased
          with us.
        </p>

        <h2 style={subHeaderStyle}>Interpretation and Definitions</h2>
        <h3 style={{ marginBottom: "1rem", color: "#000" }}>Interpretation</h3>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>

        <h3 style={{ marginBottom: "1rem", color: "#000" }}>Definitions</h3>
        <p>For the purposes of this Return and Refund Policy:</p>
        <ul style={listStyle}>
          <li>
            <p>
              <strong>Company</strong> refers to Virola Threads, 12a A.J Marinho
              Drive Victoria Island, Lagos.
            </p>
          </li>
          <li>
            <p>
              <strong>Goods</strong> refer to the items offered for sale on the
              Service.
            </p>
          </li>
          <li>
            <p>
              <strong>Orders</strong> mean a request by you to purchase Goods
              from us.
            </p>
          </li>
          <li>
            <p>
              <strong>Service</strong> refers to the Website.
            </p>
          </li>
          <li>
            <p>
              <strong>Website</strong> refers to Virola Threads, accessible from{" "}
              <a
                href="https://www.virolathreads.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                virolathreads.com
              </a>
              .
            </p>
          </li>
          <li>
            <p>
              <strong>You</strong> means the individual accessing or using the
              Service, or the company, or other legal entity on behalf of which
              such individual is accessing or using the Service, as applicable.
            </p>
          </li>
        </ul>

        <h2 style={subHeaderStyle}>Your Order Cancellation Rights</h2>
        <p>
          You are entitled to cancel your order within 7 days with reasons for
          doing so.
        </p>
        <p>
          The deadline for cancelling an order is 7 days from the date on which
          you received the Goods or on which a third party you have appointed,
          who is not the carrier, takes possession of the product delivered.
        </p>

        <h2 style={subHeaderStyle}>Contact Us</h2>
        <p>
          If you have any questions about our Returns and Refunds Policy, please
          contact us:
        </p>
        <ul style={listStyle}>
          <li style={contactItemStyle}>
            <p>
              By email:{" "}
              <a href="mailto:virolathreads@gmail.com" style={linkStyle}>
                virolathreads@gmail.com
              </a>
            </p>
          </li>
          <li style={contactItemStyle}>
            <p>
              By visiting this page on our website:{" "}
              <a
                href="https://www.virolathreads.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                virolathreads.com
              </a>
            </p>
          </li>
          <li style={contactItemStyle}>
            <p>
              By phone number:{" "}
              <a href="tel:+2347066657908" style={linkStyle}>
                07066657908
              </a>
            </p>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default Refund;
