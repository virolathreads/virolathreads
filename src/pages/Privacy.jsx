import Layout from "@/layouts/Layout";
import React from "react";

function Privacy() {
  const containerStyle = {
    padding: "2rem",
    margin: "2rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    color: "#000", // Black text color
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

  const paragraphStyle = {
    marginBottom: "1rem",
    color: "#000",
  };

  const listStyle = {
    paddingLeft: "1.5rem",
    marginBottom: "1rem",
  };

  const linkStyle = {
    color: "#000", // Black text for links
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h1 style={headerStyle}>Privacy Policy for Virola Threads</h1>

        <p style={paragraphStyle}>
          At Virola Threads, accessible from{" "}
          <a
            href="https://www.virolathreads.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            virolathreads.com
          </a>
          , one of our main priorities is the privacy of our visitors. This
          Privacy Policy document contains types of information that is
          collected and recorded by Virola Threads and how we use it.
        </p>

        <p style={paragraphStyle}>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </p>

        <p style={paragraphStyle}>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in Virola Threads. This policy is not applicable
          to any information collected offline or via channels other than this
          website.
        </p>

        <h2 style={subHeaderStyle}>Consent</h2>
        <p style={paragraphStyle}>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2 style={subHeaderStyle}>Information we collect</h2>
        <p style={paragraphStyle}>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information.
        </p>
        <p style={paragraphStyle}>
          If you contact us directly, we may receive additional information
          about you such as your name, email address, phone number, the contents
          of the message and/or attachments you may send us, and any other
          information you may choose to provide.
        </p>
        <p style={paragraphStyle}>
          When you register for an Account, we may ask for your contact
          information, including items such as name, company name, address,
          email address, and telephone number.
        </p>

        <h2 style={subHeaderStyle}>How we use your information</h2>
        <p style={paragraphStyle}>
          We use the information we collect in various ways, including to:
        </p>

        <ul style={listStyle}>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes
          </li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2 style={subHeaderStyle}>
          CCPA Privacy Rights (Do Not Sell My Personal Information)
        </h2>
        <p style={paragraphStyle}>
          Under the CCPA, among other rights, California consumers have the
          right to:
        </p>
        <ul style={listStyle}>
          <li>
            Request that a business that collects a consumer's personal data
            disclose the categories and specific pieces of personal data that a
            business has collected about consumers.
          </li>
          <li>
            Request that a business delete any personal data about the consumer
            that a business has collected.
          </li>
          <li>
            Request that a business that sells a consumer's personal data, not
            sell the consumer's personal data.
          </li>
        </ul>

        <h2 style={subHeaderStyle}>GDPR Data Protection Rights</h2>
        <p style={paragraphStyle}>
          We would like to make sure you are fully aware of all of your data
          protection rights. Every user is entitled to the following:
        </p>
        <ul style={listStyle}>
          <li>
            The right to access – You have the right to request copies of your
            personal data.
          </li>
          <li>
            The right to rectification – You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete.
          </li>
          <li>
            The right to erasure – You have the right to request that we erase
            your personal data, under certain conditions.
          </li>
          <li>
            The right to restrict processing – You have the right to request
            that we restrict the processing of your personal data, under certain
            conditions.
          </li>
          <li>
            The right to object to processing – You have the right to object to
            our processing of your personal data, under certain conditions.
          </li>
          <li>
            The right to data portability – You have the right to request that
            we transfer the data that we have collected to another organization,
            or directly to you, under certain conditions.
          </li>
        </ul>

        <h2 style={subHeaderStyle}>Children's Information</h2>
        <p style={paragraphStyle}>
          Virola Threads does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </p>

        <h2 style={subHeaderStyle}>Contact Us</h2>
        <p style={paragraphStyle}>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us.
        </p>
      </div>
    </Layout>
  );
}

export default Privacy;
