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
import { db, firestore } from "../firebaseConfig";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [move, setMove] = useState("");
  const [blogs, setBlogs] = useState(null);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blog"));
      const blogList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);

  const totalPages = blogs ? Math.ceil(blogs.length / productsPerPage) : 0;
  const currentBlogs = blogs
    ? blogs.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      )
    : [];

  const handlePageClick = (page) => setCurrentPage(page);

  const handleDelete = async (index, docId, imagePaths) => {
    console.log(`Deleting record at index: ${index}`);
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
      setBlogs(products.filter((_, i) => i !== index));
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
      <div className="flex flex-col gap-8 bg-[#f3f4f6]">
        <div className="bg-white shadow-sm rounded-md p-4">
          {move === "add" && (
            <Upload
              setBlogs={setBlogs}
              // handleMove={setMove}
              // handleAddBlog={(newBlog) => {
              //   setBlogs([newBlog,...blogs]);
              //   setMove("");
              // }}
            />
          )}
          {move === "edit" && (
            <Upload
              setBlogs={setBlogs}
              // handleMove={setMove}
              // handleAddBlog={(newBlog) => {
              //   setBlogs([newBlog,...blogs]);
              //   setMove("");
              // }}
            />
          )}
          {/* <Upload /> */}
          <Button onClick={() => setMove("add")}>Add Blog</Button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-md">
          <table className="min-w-full text-xl text-gray-600">
            <thead className="bg-gray-100 text-lg uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">S/N</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.map((blog, i) => (
                <tr
                  key={blog.id}
                  className={`${
                    i % 2 === 0 ? "bg-[#f1f1f1]" : "bg-white"
                  } border-b hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3">
                    {(currentPage - 1) * productsPerPage + i + 1}
                  </td>
                  <td className="px-4 py-3">{blog.title}</td>
                  <td className="px-4 py-3">{blog.description}</td>
                  <td className="px-4 py-3">{blog.category}</td>
                  <td className="px-4 py-3">{blog.content}</td>
                  <td className="px-4 py-3">
                    <img src={blog.image} alt={blog.title} />
                  </td>
                  <td className="px-4 py-3">{blog.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="bg-black underline"
                      onClick={() => handleEdit(i, blog)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right bg-red ">
                    <button
                      className="text-red underline"
                      onClick={() => handleDelete(i, blog.id, blog.image)}
                    >
                      Delete
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
                  disabled={currentPage === 1}
                  onClick={() => handlePageClick(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => handlePageClick(i + 1)}
                    className={currentPage === i + 1 ? "font-bold" : ""}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
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
