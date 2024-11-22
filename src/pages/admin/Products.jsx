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

export function Products() {
  const access = sessionStorage.getItem("virolatoken");

  if (!access) {
    window.location.href = "/login";
    sessionStorage.setItem("virolatoken", "");
    toast.info("You are not allowed to view this page.");
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [move, setMove] = useState("");
  const [userState, setUserState] = useState(null);
  const [products, setProducts] = useState(null);
  const productsPerPage = 5;

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "blog"));
    const blogList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(blogList);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = products ? Math.ceil(products.length / productsPerPage) : 0;
  const currentBlogs = products
    ? products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      )
    : [];

  const handleEdit = (i, blog) => {
    setMove("edit");
    setUserState(blog);
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
      setProducts(products.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting document and images:", error);
      toast.error("Error deleting document and images:", error);
    }
  };
  if (!products) {
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
        {move === "add" || move === "edit" ? (
            <Button onClick={() => setMove("")}>Close</Button>
          ) : (
            <Button onClick={() => setMove("add")}>Add Blog</Button>
          )}
          {move === "add" && (
            <Upload
              setProducts={setProducts}
              fetchProducts={fetchProducts}
             
            />
          )}
          {move === "edit" && (
            <Edit
              setBlogs={setBlogs}
              fetchBlogs={fetchBlogs}
              items={userState}
              // handleMove={setMove}
              // handleAddBlog={(newBlog) => {
              //   setBlogs([newBlog,...blogs]);
              //   setMove("");
              // }}
            />
          )}

        
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
                    <img src={blog.imageUrls} alt={blog.title} />
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
                      onClick={() => handleDelete(i, blog.id, blog.imageUrls)}
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
                      currentPage === i + 1 ? "font-bold text-lg" : "text-lg"
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