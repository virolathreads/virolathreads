import { db, firestore } from "@/pages/firebaseConfig";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";

export default function CommentForm({ fetchComments, id }) {
  const today = new Date().toISOString().split("T")[0];
  const access = sessionStorage.getItem("virolatoken");
  const [comment, setComment] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = React.useState(today);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!comment || !name) {
      toast.error("Please enter a comment and your name!");
      return;
    }

    try {
      const blogRef = doc(firestore, "blog", id);

      // Create a comment object
      const newComment = {
        name: name,
        email: email,
        comment: comment,
        date: date,
      };

      // Update the blog document by adding the new comment to the array
      await updateDoc(blogRef, {
        comments: arrayUnion(newComment),
      });

      toast.success("Comment added successfully!");
      await fetchComments();
      // Clear the form fields
      setIsLoading(false);
      setName("");
      setEmail("");
      setComment("");
      setDate(today);
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding comment: ", error);
      toast.error("Failed to add comment.");
    }
  };

  return (
    <div class="comment-form">
      <h4>Leave a Reply</h4>
      <form
        class="form-contact comment_form"
        onSubmit={handleSubmit}
        id="commentForm"
      >
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <textarea
                class="form-control w-100"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id="comment"
                cols="30"
                rows="9"
                placeholder="Write Comment"
              ></textarea>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <input
                class="form-control"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <input
                class="form-control"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
          {access && (
            <div class="col-sm-6">
              <div class="form-group">
                <input
                  class="form-control"
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  placeholder="Date"
                />
              </div>
            </div>
          )}
        </div>
        <div class="form-group">
          {isLoading ? (
            <button
              type="submit"
              class="button button-contactForm btn_1 boxed-btn"
              disabled
            >
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
              class="button button-contactForm btn_1 boxed-btn"
            >
              Post Comment
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
