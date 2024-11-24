import React from "react";

export default function EmbeddedWixEvents() {
  const wixEventPageURL = "https://virolathreads.wixsite.com/virola"; // Replace with your Wix Events page URL

  return (
    <div style={{ width: "100%", height: "100vh", border: "none" }}>
      <iframe
        src={wixEventPageURL}
        title="Wix Events"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
}
