import { db } from "@/pages/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("user.email");

  const getUserByEmail = async () => {
    if (!email) {
      console.error("No email found in localStorage.");
      return;
    }

    try {
      // Reference the `users` collection
      const usersRef = collection(db, "user");

      // Create a query to find the document with the specific email
      const q = query(usersRef, where("email", "==", email));

      // Execute the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If matching documents are found, return their data
        const userData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUser(userData[0]); // Assuming one user per email
      } else {
        console.log("No user found with this email.");
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  };

  useEffect(() => {
    getUserByEmail(); // Call the function when the hook is mounted
  }, []); // Empty dependency array to only run once

  return {
    user,
  };
};
