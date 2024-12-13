import { useUser } from "@/hooks/useUser";
import Layout from "@/layouts/Layout";
import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

export default function AccountDetailsCard() {
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription state
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  // Generate referral code on component mount
  useEffect(() => {
    const generateReferralCode = () => {
      const prefix = "VIROLA"; // Store name prefix
      const uniquePart = nanoid(8).toUpperCase(); // Generate an 8-character unique code
      return `${prefix}-${uniquePart}`;
    };
    setReferralCode(generateReferralCode());
  }, []);

  // Initialize subscription state
  useEffect(() => {
    if (user?.newsletter !== undefined) {
      setIsSubscribed(user.newsletter);
    }
    // if (!localStorage.getItem("user.email")) {
    //   setTimeout(() => {
    //     window.location.href = "/login";
    //   }, 3000);
    //   toast.info("Please login to view your account details");
    // }
    console.log(localStorage.getItem("user.email"));
  }, [user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSubscription = async () => {
    // Ensure the user sub logged in and has an ID
    setLoading(true);

    try {
      const userDocRef = doc(db, "user", user.id); // Adjust collection and document path as needed
      const newStatus = !isSubscribed;
      await updateDoc(userDocRef, { newsletter: newStatus });
      setIsSubscribed(newStatus);

      // Toast notification
      if (newStatus) {
        toast.success("You are now subscribed to the newsletter!");
      } else {
        toast.info("You have unsubscribed from the newsletter.");
      }
    } catch (error) {
      console.error("Error updating subscription status:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="relative bg-cover bg-center min-h-screen flex items-center justify-center">
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-10"></div>

        {/* Card */}
        <div className="relative z-20 bg-white rounded-lg shadow-xl p-10 max-w-2xl w-full flex flex-col space-y-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Account Details</h2>
          <p className="text-lg text-gray-600">
            Manage your account and share your referral code!
          </p>

          {/* User Info */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-full text-left">
              <span className="text-sm text-gray-500">Full Name:</span>
              <h3 className="text-2xl font-medium text-gray-800">
                {user?.name || "John Doe"}
              </h3>
            </div>
            <div className="w-full text-left">
              <span className="text-sm text-gray-500">Email:</span>
              <h3 className="text-2xl font-medium text-gray-800">
                {user?.email || "john.doe@example.com"}
              </h3>
            </div>
            <div className="w-full text-left">
              <span className="text-sm text-gray-500">Newsletter:</span>
              <h3 className="text-2xl font-medium text-gray-800">
                {isSubscribed ? "SUBSCRIBED" : "NOT SUBSCRIBED"}
              </h3>
              <button
                onClick={toggleSubscription}
                disabled={loading}
                className={`mt-4 px-4 py-2 text-lg font-semibold rounded-md ${
                  isSubscribed ? " btn" : " btn"
                } `}
              >
                {loading
                  ? "Processing..."
                  : isSubscribed
                  ? "Unsubscribe"
                  : "Subscribe"}
              </button>
            </div>
            <div className="w-full text-left">
              <span className="text-sm text-gray-500">Referral Code:</span>
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl font-medium text-gray-800">
                  {referralCode}
                </h3>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 text-lg font-semibold text-black bg-blue-500 rounded-md hover:bg-blue-600 transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-4 w-full">
            {/* <a
              href="/edit-profile"
              className="w-full py-3 text-lg font-semibold text-black bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Edit Profile
            </a> */}
            <a
              href="/"
              onClick={() => localStorage.clear()}
              className=" btn w-full py-3 text-lg font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              LOG OUT
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
