import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LoginLayout from "@/layouts/LoginLayout";
import { Upload } from "./Upload";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, firestore, storage } from "../firebaseConfig";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { deleteObject, ref } from "firebase/storage";
import { Edit } from "./Edit";
import CommentTable from "./CommentTable";

export function BlogList() {
  const access = sessionStorage.getItem("virolatoken");
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };
  if (!access) {
    window.location.href = "/login";
    sessionStorage.setItem("virolatoken", "");
    toast.info("You are not allowed to view this page.");
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [move, setMove] = useState("");
  const [comment, setComment] = useState();
  const [userState, setUserState] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const productsPerPage = 5;

  const fetchBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "blog"));
    const blogList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBlogs(blogList);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = blogs ? Math.ceil(blogs.length / productsPerPage) : 0;

  const sortedBlogs =
    blogs && blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Now slice the sorted array to get the current page's products

  const currentBlogs = sortedBlogs
    ? sortedBlogs.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      )
    : [];

  const handleEdit = (i, blog) => {
    setMove("edit");
    setUserState(blog);
  };

  const handleView = (i, blogComments, blog) => {
    if (!blogComments?.length) return toast.error(`No comments`);
    setMove("comments");
    setUserState(blog);
    setComment(blogComments);
  };

  const handlePageClick = (page) => setCurrentPage(page);

  const handleDelete = async (index, docId, imagePaths) => {
    try {
      // Step 1: Delete the document from Firestore
      const docRef = doc(firestore, "blog", docId);
      await deleteDoc(docRef);

      toast.success("Document deleted from Firestore");

      // Step 2: Delete the image files from Firebase Storage
      const deletePromises = imagePaths.map((imagePath) => {
        const storageRef = ref(storage, imagePath);
        return deleteObject(storageRef);
      });

      await Promise.all(deletePromises);
      toast.success("Image files deleted from storage");

      // Update local state to remove the deleted product
      setBlogs(blogs.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting document and images:", error);
      toast.error("Error deleting document and images:", error);
    }
  };
  if (!blogs) {
    return (
      <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e0e0e0">
        <div className="p-6">
          <Skeleton count={6} height={40} />
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <LoginLayout>
      <div className="flex flex-col gap-8 ">
        <div className="bg-white shadow-sm rounded-md p-4 bg-[#0c392d]">
          {move === "add" || move === "edit" || move === "comments" ? (
            <Button onClick={() => setMove("")}>Close</Button>
          ) : (
            <Button className="bg-[#0c392d]" onClick={() => setMove("add")}>
              Add Blog
            </Button>
          )}
          {move === "add" && (
            <Upload setBlogs={setBlogs} fetchBlogs={fetchBlogs} />
          )}
          {move === "edit" && (
            <Edit
              setBlogs={setBlogs}
              fetchBlogs={fetchBlogs}
              items={userState}
            />
          )}
          {move === "comments" && (
            <CommentTable comments={comment} blogId={userState.id} />
          )}
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-md">
          <table className="min-w-full text-xl text-gray-600 tables">
            <thead className="bg-gray-100 text-lg uppercase text-gray-700 theads">
              <tr className="tr">
                <th className="px-4 py-3 th">S/N</th>
                <th className="px-4 py-3 th">Title</th>
                <th className="px-4 py-3 th">Description</th>
                <th className="px-4 py-3 th">Category</th>
                <th className="px-4 py-3 th">Content</th>
                <th className="px-4 py-3 th">Image</th>
                <th className="px-4 py-3 th">Comments</th>
                <th className="px-4 py-3 th">Date</th>
                <th className="px-4 py-3 th text-right">Edit</th>
                <th className="px-4 py-3 th text-right">Delete</th>
                <th className="px-4 py-3 th text-right">View Comments</th>
              </tr>
            </thead>{" "}
            <tbody>
              {currentBlogs.map((blog, i) => (
                <tr
                  key={blog.id}
                  className={`${
                    i % 2 === 0 ? "bg-[#f1f1f1]" : "bg-white"
                  } border-b hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 td" data-label="S/N">
                    {(currentPage - 1) * productsPerPage + i + 1}
                  </td>
                  <td className="px-4 py-3 td" data-label="Title">
                    {blog.title}
                  </td>
                  <td className="px-4 py-3 td" data-label="Description">
                    {blog.description}
                  </td>
                  <td className="px-4 py-3 td" data-label="Category">
                    {blog.category}
                  </td>
                  <td
                    className="px-4 py-3 td"
                    data-label="Content"
                    dangerouslySetInnerHTML={{
                      __html: blog.content,
                    }}
                  ></td>
                  <td className="px-4 py-3 td" data-label="Image">
                    <img src={blog.imageUrls} alt={blog.title} />
                  </td>
                  <td className="px-4 py-3 td" data-label="Comments">
                    {blog.comments && blog.comments.length > 0
                      ? blog.comments.length
                      : "0"}
                  </td>
                  <td className="px-4 py-3 td" data-label="Date">
                    {blog.date}
                  </td>
                  <td className="px-4 py-3 td text-right" data-label="Edit">
                    <button
                      className="bg-black underline"
                      onClick={() => {
                        handleEdit(i, blog);
                        handleClick();
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-3 td text-right" data-label="Delete">
                    <button
                      className="text-red underline"
                      onClick={() => handleDelete(i, blog.id, blog.imageUrls)}
                    >
                      Delete
                    </button>
                  </td>
                  <td
                    className="px-4 py-3 td text-right"
                    data-label="View Comments"
                  >
                    <button
                      className="bg-black underline"
                      onClick={() => {
                        handleView(i, blog.comments, blog);
                        handleClick();
                      }}
                    >
                      View Comments
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="text-xl"
                  disabled={currentPage === 1}
                  onClick={() => handlePageClick(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageClick(i + 1)}
                    className={
                      currentPage === i + 1
                        ? "font-bold text-2xl "
                        : "text-2xl "
                    }
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className="text-xl"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageClick(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </LoginLayout>
  );
}
