import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { format } from "date-fns";

import Newsletter from "../components/Newsletter";
import Category from "../components/Category";
import IgFeeds from "../components/IgFeeds";
import RecentPost from "../components/RecentPost";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import PreLoader from "@/lib/PreLoader";

export default function Blog() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [tag, setTag] = useState("");
  const [item, setItem] = useState("all");
  const [blogs, setBlogs] = useState("");
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "blog"));
      const blogList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Calculate the indices of the products to be displayed on the current page

  const sortedBlogs =
    blogs && blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Now slice the sorted array to get the current page's products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedBlogs.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogs.length / productsPerPage);

  // Handle page change
  const lifoItems = [...currentProducts].slice(0, 3);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handleClick = (blog) => {
    navigate(`/blog/${blog}`);
  };

  if (loading) {
    return <PreLoader />;
  }

  const handleCategory = (blogs, catag) => {
    const filteredProducts = blogs.filter((blog) => blog.category === catag);
    const sortedBlogs =
      filteredProducts &&
      filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Now slice the sorted array to get the current page's products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedBlogs.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    const totalPage = Math.ceil(filteredProducts.length / productsPerPage);
    const nopage = Array.from({ length: totalPage }, (_, index) => index + 1);



    return (
      <>
        <div className="product-grid">
          {currentProducts.length > 0 ? (
            currentProducts
              .filter((product) => {
                if (
                  query == "" ||
                  product.title.toLowerCase().includes(query.toLowerCase()) ||
                  product.description
                    .toLowerCase()
                    .includes(query.toLowerCase())
                ) {
                  return true; // This product matches the query or query is empty
                }
                return false; // This product does not match the query
              })
              .map((item, index) => (
                <article className="blog_item" key={index}>
                  <div className="blog_item_img">
                    <img
                      className="card-img   w-50 h-auto rounded-0"
                      src={item.imageUrls[0]}
                      alt={`Blog ${item.title}`}
                    />
                    <a href="#" className="blog_item_date">
                      <p>
                        {" "}
                        {format(
                          new Date(item.date),
                          "dd MMMM yyyy"
                        ).toUpperCase()}
                      </p>
                    </a>
                  </div>
                  <div className="blog_details">
                    <a
                      className="d-inline-block"
                      href="#"
                      onClick={() => handleClick(item.id)}
                    >
                      <h2
                        className="blog-head"
                        style={{ color: "#2d2d2d" }}
                        onClick={() => handleClick(item.id)}
                      >
                        {item.title.toUpperCase()}
                      </h2>
                    </a>
                    <p onClick={() => handleClick(item.id)}>
                      {item.description}
                    </p>
                    <ul className="blog-info-link">
                      <li>
                        <a href="#">
                          <i className="fa fa-user"></i> {item.category}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {(item.comments && item.comments.length + " ") ||
                            0 + " "}
                          <i className="fa fa-comments"></i> Comments
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          {(item.views && item.views + " ") || 0 + " "}
                          <i className="fa fa-eye"></i> Views
                        </a>
                      </li>
                    </ul>
                  </div>
                </article>
              ))
          ) : (
            <p> No Record Found</p>
          )}
        </div>
        <nav className="blog-pagination justify-content-center d-flex">
          <ul className="pagination">
            {/* Previous Button */}
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                aria-label="Previous"
                onClick={() =>
                  currentPage > 1 && handlePageClick(currentPage - 1)
                }
              >
                <i className="ti-angle-left"></i>
              </button>
            </li>

            {/* Page Numbers */}
            {nopage.map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            {/* Next Button */}
            <li
              className={`page-item ${
                currentPage === totalPage ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                aria-label="Next"
                onClick={() =>
                  currentPage < totalPage && handlePageClick(currentPage + 1)
                }
              >
                <i className="ti-angle-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </>
    );
  };

  return (
    <Layout>
      <main>
        <div className="page-notification page-notification2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/blog">Blog</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <section className="blog_area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-5 mb-lg-0">
                {item === "all" && (
                  <div className="blog_left_sidebar">
                    {currentProducts.length > 0 ? (
                      currentProducts &&
                      currentProducts
                        .filter((product) => {
                          if (
                            query == "" ||
                            product.title
                              .toLowerCase()
                              .includes(query.toLowerCase()) ||
                            product.description
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          ) {
                            return true; // This product matches the query or query is empty
                          }
                          return false; // This product does not match the query
                        })
                        .map((item, index) => (
                          <article className="blog_item" key={index}>
                            <div className="blog_item_img">
                              <img
                                className="card-img w-50 h-auto rounded-0"
                                src={item.imageUrls}
                                alt={`Blog ${item.title}`}
                              />
                              <a href="#" className="blog_item_date">
                                <p>
                                  {" "}
                                  {format(
                                    new Date(item.date),

                                    "dd MMMM yyyy"
                                  ).toUpperCase()}
                                </p>
                              </a>
                            </div>
                            <div className="blog_details">
                              <a
                                className="d-inline-block"
                                href="#"
                                onClick={() => handleClick(item.id)}
                              >
                                <h2
                                  className="blog-head"
                                  style={{ color: "#2d2d2d" }}
                                  onClick={() => handleClick(item.id)}
                                >
                                  {item.title.toUpperCase()}
                                </h2>
                              </a>
                              <p onClick={() => handleClick(item.id)}>
                                {item.description}
                              </p>
                              <ul className="blog-info-link">
                                <li>
                                  <a href="#">
                                    <i className="fa fa-user"></i>{" "}
                                    {item.category}
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    {(item.comments &&
                                      item.comments.length + " ") ||
                                      0 + " "}
                                    <i className="fa fa-comments"></i> Comments
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    {(item.views && item.views + " ") ||
                                      0 + " "}
                                    <i className="fa fa-eye"></i> Views
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </article>
                        ))
                    ) : (
                      <p> No Record Found</p>
                    )}
                    <nav className="blog-pagination justify-content-center d-flex">
                      <ul className="pagination">
                        {/* Previous Button */}
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            aria-label="Previous"
                            onClick={() =>
                              currentPage > 1 &&
                              handlePageClick(currentPage - 1)
                            }
                          >
                            <i className="ti-angle-left"></i>
                          </button>
                        </li>

                        {/* Page Numbers */}
                        {pages.map((page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              page === currentPage ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageClick(page)}
                            >
                              {page}
                            </button>
                          </li>
                        ))}

                        {/* Next Button */}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            aria-label="Next"
                            onClick={() =>
                              currentPage < totalPages &&
                              handlePageClick(currentPage + 1)
                            }
                          >
                            <i className="ti-angle-right"></i>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}

                {item === tag && <>{handleCategory(blogs, tag)}</>}
              </div>

              <div className="col-lg-4">
                <div className="blog_right_sidebar">
                  <SearchBar setQuery={setQuery} />

                  <Category
                    setItem={setItem}
                    setTag={setTag}
                    currentProducts={blogs}
                  />
                  {/** Popular Posts Widget */}
                  <RecentPost lifoItems={lifoItems} handleClick={handleClick} />

                  {/** Instagram Feeds Widget */}
                  {/* <IgFeeds /> */}

                  {/** Newsletter Widget */}
                  <Newsletter />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
