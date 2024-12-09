import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventSlider() {
  const events = [
    {
      id: 1,
      title: "Virola Threads Runway Debut",
      date: "6th of December 2024, 19:00 – 21:00",
      location: "Oriental Hotel, Victoria Island, Lagos, Nigeria",
      type: "Past Events",
      image:
        "https://vorlane.com/wp-content/uploads/2024/10/101970s-disco-inspired-runway-scene-with-disco-balls-and-reflectors-creating-a-vibrant-glittery-atmosphere.webp",
    },
    {
      id: 2,
      title: "Accra Fashion Fair 2024 || virola threads",
      date: "21st - 23rd of December 2024",
      location: "Ghana Dubai, Circle, Accra",
      type: "Upcoming Events",
      image:
        "https://vorlane.com/wp-content/uploads/2024/10/101970s-disco-inspired-runway-scene-with-disco-balls-and-reflectors-creating-a-vibrant-glittery-atmosphere.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

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
      {events[currentIndex].type}
      </motion.h2>

      {/* Event Slider */}
      <div
        style={{
          position: "relative",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Slider Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={events[currentIndex].id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {/* Image */}
            <div style={{ position: "relative", height: "500px" }}>
              <img
                src={events[currentIndex].image}
                alt="Event"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Event Content */}
            <div
              style={{
                padding: "2rem",
                color: "#65867c",
                textAlign: "left",
              }}
            >
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "gray",
                  marginBottom: "1rem",
                }}
              >
                {events[currentIndex].title}
              </h1>
              <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                <strong>When:</strong> {events[currentIndex].date}
              </p>
              <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                <strong>Where:</strong> {events[currentIndex].location}
              </p>

              {/* Call-to-Action */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginTop: "1.5rem",
                }}
              >
                <motion.button
                  // style={{
                  //   padding: "1rem 2rem",
                  //   backgroundColor: "#65867c",
                  //   color: "#ffffff",
                  //   border: "none",
                  //   borderRadius: "5px",
                  //   cursor: "pointer",
                  //   fontSize: "1.5rem",
                  //   transition: "all 0.3s",
                  // }}

                  class="button button-contactForm boxed-btn hover:text-white"
                >
                  <a href="/events" style={{ textDecoration: "none" }}>
                    Register Now
                  </a>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#65867c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Previous
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#65867c",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Next
          </motion.button>
        </div>
      </div>
    </div>
  );
}
