import React from "react";
import { motion } from "framer-motion";

export default function EventCard() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "3rem",
        minHeight: "100vh",
      }}
    >
      {/* Animated Header */}
      <motion.h2
        style={{
          textAlign: "center",
          fontSize: "3.5rem",
          color: "#65867c",
          padding: "3rem",
          fontWeight: "light",
          marginBottom: "2rem",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Upcoming Events
      </motion.h2>

      {/* Animated Event Card */}
      <motion.div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "2px",
          // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Runway Image with Fade In */}
        <motion.div
          style={{ position: "relative", height: "500px", overflow: "hidden" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://vorlane.com/wp-content/uploads/2024/10/101970s-disco-inspired-runway-scene-with-disco-balls-and-reflectors-creating-a-vibrant-glittery-atmosphere.webp"
            alt="Runway"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        {/* Event Content */}
        <motion.div
          style={{ padding: "2rem", color: "#65867c", textAlign: "left" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "gray",
              marginBottom: "1rem",
            }}
          >
            Virola Threads Runway Debut
          </h1>
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            <strong>When:</strong> 6th of December 2024, 19:00 – 21:00
          </p>
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            <strong>Where:</strong> Oriental Hotel, Victoria Island, Lagos,
            Nigeria
          </p>

          {/* Call-to-Action Button centered with Hover animation */}
          <motion.div
            style={{
              display: "flex",
              justifyContent: "left", // Center the button
              gap: "1rem",
              marginTop: "1.5rem",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <motion.button
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#65867c",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1.5rem",
                transition: "all 0.3s",
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#4e6b5e",
              }}
            >
              <a
                href="/events"
                style={{ color: "white", textDecoration: "none" }}
              >
                Register Now
              </a>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
