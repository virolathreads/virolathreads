import React, { useState, useEffect } from "react";

const testimonialsData = [
  {
    text: `"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."`,
    name: "Micheal Gough",
    position: "CEO at Google",
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
  },
  {
    text: `"This platform is fantastic. It's a great tool for managing everything from project planning to execution. It helped our team stay on track with our goals."`,
    name: "Sarah Lee",
    position: "CTO at Microsoft",
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sarah-lee.png",
  },
  {
    text: `"I love how intuitive and user-friendly this service is. It has improved the way we collaborate across teams, and we've seen a significant increase in productivity."`,
    name: "John Doe",
    position: "Product Manager at Tesla",
    image:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/john-doe.png",
  },
  // Add more testimonials here
];

export default function Testimonials() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Next testimonial function
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Previous testimonial function
  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  // Autoplay slider every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(nextTestimonial, 5000); // Change slides every 5 seconds

    // Cleanup the interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Get current testimonial data
  const { text, name, position, image } =
    testimonialsData[currentTestimonialIndex];

  return (
    <section className="bg-white dark:bg-gray-900 py-10">
      <div className="max-w-screen-xl px-4 mx-auto text-center lg:px-6">
        <h2 className="text-5xl font-medium text-gray-900 dark:text-white mb-20 mt-5">
          What Our Customers Say About Us
        </h2>
        <figure className="max-w-screen-md mx-auto">
          <svg
            className="h-12 mx-auto mb-3 text-[#5e897c] dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-xl md:text-2xl font-medium text-[gray-900] dark:text-white">
              {text}
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-lighter text-gray-900 dark:text-white">
                {name}
              </div>
              {/* <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                {position}
              </div> */}
            </div>
          </figcaption>
        </figure>

        {/* Slider controls */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={prevTestimonial}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-full"
          >
            {"<"}
          </button>
          <button
            onClick={nextTestimonial}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-full"
          >
            {">"}
          </button>
        </div>
      </div>
    </section>
  );
}
