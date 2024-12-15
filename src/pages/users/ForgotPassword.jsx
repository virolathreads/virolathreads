import React, { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";
import Layout from "@/layouts/Layout";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    securityAnswer: "",
    newPassword: "",
  });

  const [securityQuestion, setSecurityQuestion] = useState(null); // Holds the fetched question
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Track email verification
  const [isLoading, setIsLoading] = useState(false);
  const [userDocId, setUserDocId] = useState(""); // Save the document ID for later password update

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 1: Verify email and fetch security question
  // Security question options mapping
  const securityQuestionsMap = {
    pet: "What is your pet's name?",
    school: "What is the name of your first school?",
    city: "In which city were you born?",
  };

  // Step 1: After fetching the data, display the mapped question
  const handleVerifyEmail = async () => {
    const { email } = formData;

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setIsLoading(true);

      // Query Firestore for user with matching email
      const q = query(collection(db, "user"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUserDocId(userDoc.id);

        const userData = userDoc.data();

        // Map the stored security question value to a readable question
        const readableQuestion =
          securityQuestionsMap[userData.securityQuestions];
        setSecurityQuestion(readableQuestion); // Set readable question
        setIsEmailVerified(true);

        toast.success("Security question retrieved. Please answer it.");
      } else {
        toast.error("Email not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching security question:", error);
      toast.error("Failed to fetch security question.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Validate security answer and update password
  const handleUpdatePassword = async () => {
    const { securityAnswer, newPassword } = formData;

    if (!securityAnswer || !newPassword) {
      toast.error("Please enter all required fields");
      return;
    }

    try {
      setIsLoading(true);

      // Fetch the user document
      const userDocRef = doc(db, "user", userDocId);
      const userSnapshot = await getDocs(query(collection(db, "user")));

      const userData = userSnapshot.docs
        .map((doc) => doc.data())
        .find((data) => data.email === formData.email);

      if (
        userData.securityAnswer.toLowerCase() === securityAnswer.toLowerCase()
      ) {
        // Update the password in Firestore
        await updateDoc(userDocRef, {
          password: newPassword, // Ensure this is hashed in a real app
        });

        toast.success("Password updated successfully. You can now log in.");
        setFormData({ email: "", securityAnswer: "", newPassword: "" });
        setIsEmailVerified(false);
        setSecurityQuestion(null);
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        toast.error("Incorrect security answer. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
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

        {/* Form Container */}
        <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Forgot Password
            </h1>

            {!isEmailVerified ? (
              <>
                {/* Step 1: Email Verification */}
                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-900">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg text-gray-900"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className="btn w-full py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </button>
              </>
            ) : (
              <>
                {/* Step 2: Security Question and Password Update */}
                <div>
                  <p className="mb-4 text-lg font-medium text-gray-700">
                    Security Question: {securityQuestion}
                  </p>

                  <label className="block mb-2 text-lg font-medium text-gray-900">
                    Security Answer
                  </label>
                  <input
                    type="text"
                    name="securityAnswer"
                    value={formData.securityAnswer}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg text-gray-900"
                    placeholder="Enter your answer"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-900">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg text-gray-900"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  className="btn w-full py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
