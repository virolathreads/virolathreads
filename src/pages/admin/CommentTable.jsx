import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { firestore } from "../firebaseConfig";

export default function CommentTable({ comments, blogId }) {
  const [comm, setComm] = React.useState(comments);

  const handleDelete = async (commentToDelete) => {
    try {
      const blogRef = doc(firestore, "blog", blogId);

      // Remove the comment from the comments array
      await updateDoc(blogRef, {
        comments: arrayRemove(commentToDelete),
      });
      setComm(comments.filter((comment) => comment !== commentToDelete));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error("Failed to delete comment.");
    }
  };
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-md">
      <table className="min-w-full text-xl text-gray-600">
        <thead className="bg-gray-100 text-lg uppercase text-gray-700">
          <tr>
            <th className="px-4 py-3">S/N</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>

            <th className="px-4 py-3">Comment</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {comments &&
            comments.map((blog, i) => (
              <tr
                key={blog.id}
                className={`${
                  i % 2 === 0 ? "bg-[#f1f1f1]" : "bg-white"
                } border-b hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3">{blog.name}</td>
                <td className="px-4 py-3">{blog.email}</td>
                <td className="px-4 py-3">{blog.comment}</td>
                <td className="px-4 py-3">{blog.date}</td>

                <td className="px-4 py-3 text-right bg-red ">
                  <button
                    className="text-red underline"
                    onClick={() => handleDelete(i, blog)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
