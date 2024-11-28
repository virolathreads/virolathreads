import React, { useEffect, useState } from "react";
import { query, where, getDocs, collection } from "firebase/firestore";
import Layout from "@/layouts/Layout";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";

export const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData; // Assuming formData contains email and password

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true); // Start loading state

      // Check if the email exists in Firestore
      const q = query(collection(db, "user"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Email not found
        toast.error("Invalid credentials: Email does not exist.");
        return;
      }

      // Email exists, now check if the password matches
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.password !== password) {
        // Password mismatch
        toast.error("Invalid credentials: Incorrect password.");
        return;
      }

      // Successful login, redirect to dashboard
      localStorage.setItem("user.email", userData.email);
      localStorage.setItem("accId", userData.accountId);
      localStorage.setItem("name", userData.name);
      // localStorage.setItem("name", email);
      toast.success("Login successful!");
      // navigate("/"); // Replace with your actual dashboard route
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(`Error logging in: ${error.message}`);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <Layout>
      <section className="relative bg-cover bg-center">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dd0mdsb3h/video/upload/v1732832983/vife_ynyc7w.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay with blur effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>

        {/* Form Container */}
        <div className="relative z-20 flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg dark:border dark:border-gray-700 sm:max-w-2xl">
            <div className="p-8 space-y-6 sm:p-10">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white text-center">
                Login
              </h1>
              <form className="space-y-6  text-left" onSubmit={handleSubmit}>
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

                {isLoading ? (
                  <button type="submit" disabled className="btn">
                    Submitting
                  </button>
                ) : (
                  <button type="submit" className="btn ">
                    Submit
                  </button>
                )}
                <p className="text-2xl font-light text-gray-500 dark:text-gray-400">
                  {" "}
                  Don't have an account?{" "}
                  <a
                    href="/createaccount"
                    className="font-medium text-primary-600 underline dark:text-primary-500"
                  >
                    Create one
                  </a>
                </p>
                <p className="text-2xl font-light text-gray-500 dark:text-gray-400">
                  {" "}
                  <a
                    href="/forgotPassword"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot Password?
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
