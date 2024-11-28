import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/layouts/Layout";

import { toast } from "react-toastify";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestions: "",
    securityAnswer: "",
    newsletter: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to get or generate the unique ID
  const getOrCreateUniqueId = () => {
    let uniqueId = localStorage.getItem("newId");
    if (!uniqueId) {
      uniqueId = uuidv4();
      localStorage.setItem("newId", uniqueId);
    }
    return uniqueId;
  };

  useEffect(() => {
    getOrCreateUniqueId();
  }, []);

  // Generate and save the unique ID

  const handlePasswordValidation = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  const id = localStorage.getItem("newId");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Navigation hook for redirection

    const {
      name,
      email,
      password,
      securityQuestions,
      securityAnswer,
      newsletter,
    } = formData;

    const data = {
      accountId: id, // Ensure `id` is defined elsewhere
      name: name,
      email: email,
      password: password,
      securityQuestions: securityQuestions,
      securityAnswer: securityAnswer,
      newsletter: newsletter,
    };

    try {
      setIsLoading(true); // Start loading state

      // Check if the email already exists in the "user" collection
      const q = query(collection(db, "user"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Email exists, redirect to login
        toast.info("Email already exists. Redirecting to login...");
        navigate("/login"); // Adjust the path to your login page
        return;
      }

      // Add a new document to Firestore
      const docRef = await addDoc(collection(db, "user"), data);

      if (docRef.id) {
        toast.success("Account created successfully");
      }
      navigate("/login");
      // Reset the form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        securityQuestions: "",
        securityAnswer: "",
        newsletter: false,
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error(`Error uploading document: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <Layout>
      <section className="relative bg-cover bg-center pt-5 pb-5">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dd0mdsb3h/video/upload/v1732832983/vife_ynyc7w.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay with blur effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

        <div className="relative z-20 flex items-center justify-center min-h-[calc(100vh-8rem)] pt-10">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg dark:border dark:border-gray-700 sm:max-w-2xl">
            <div className="p-8 space-y-6 sm:p-10">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
                Create an Account
              </h1>
              <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 text-lg focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 text-lg focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 text-lg focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-15 right-3 text-gray-600 dark:text-gray-300"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirm-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handlePasswordValidation}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 text-lg focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {/* Eye Icon */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-10 right-3 text-gray-600 dark:text-gray-300"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                {/* Security Question */}
                <div>
                  <label
                    htmlFor="securityQuestions"
                    className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                  >
                    Security Question
                  </label>
                  <select
                    name="securityQuestions"
                    id="securityQuestions"
                    value={formData.securityQuestions}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 text-lg focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select a question
                    </option>
                    <option value="pet">What is your pet's name?</option>
                    <option value="school">
                      What is the name of your first school?
                    </option>
                    <option value="city">In which city were you born?</option>
                  </select>
                </div>

                {/* Security Answer */}
                <div>
                  <label
                    htmlFor="securityAnswer"
                    className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
                  >
                    Security Answer
                  </label>
                  <input
                    type="text"
                    name="securityAnswer"
                    id="securityAnswer"
                    value={formData.securityAnswer}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 text-lg focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your answer"
                    required
                  />
                </div>

                {/* Newsletter Checkbox */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 text-lg dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-2xl">
                    <label
                      htmlFor="newsletter"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I agree to subscribe to the receive newsletters
                    </label>
                  </div>
                </div>

                {isLoading ? (
                  <button type="submit" disabled className="btn">
                    Submitting
                  </button>
                ) : (
                  <button type="submit" className="btn">
                    Submit
                  </button>
                )}

                <p className="text-2xl font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
