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

export default function Blog() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [tag, setTag] = useState("");
  const [blogs, setBlogs] = useState("");
  const [item, setItem] = useState("all");
  const [query, setQuery] = useState("");
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "blog"));
      const blogList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    };

    fetchProducts();
  }, []);


  // Calculate the indices of the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = blogs.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate the total number of pages
  const totalPages = Math.ceil(blogs.length / productsPerPage);

  // Handle page change
  const lifoItems = [...currentProducts].reverse().slice(0, 3);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handleClick = (blog) => {
    navigate(`/blog/${blog}`);
  };

  const handleCategory = (currentProducts, catag) => {
    const totalPage = Math.ceil(currentProducts.length / productsPerPage);
    const nopage = Array.from({ length: totalPage }, (_, index) => index + 1);
    const filteredProducts = currentProducts.filter(
      (blog) => blog.category === catag
    );

    return (
      <>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts
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
                      <p> {format(new Date(item.date), "dd MMM yyyy")}</p>
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
                          <i className="fa fa-comments"></i> Comments
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
            <li className={`page-item ${currentPage === 1 ? "disabled " : ""}`}>
              <a
                href="#"
                className="page-link"
                aria-label="Previous"
                onClick={() =>
                  currentPage > 1 && handlePageClick(currentPage - 1)
                }
              >
                <i className="ti-angle-left"></i>
              </a>
            </li>

            {/* Page Numbers */}
            {nopage.map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active " : ""}`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </a>
              </li>
            ))}

            {/* Next Button */}
            <li
              className={`page-item ${
                currentPage === totalPage ? "disabled" : ""
              }`}
            >
              <a
                href="#"
                className="page-link"
                aria-label="Next"
                onClick={() =>
                  currentPage < totalPage && handlePageClick(currentPage + 1)
                }
              >
                <i className="ti-angle-right"></i>
              </a>
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
                                  {format(new Date(item.date), "dd MMM yyyy")}
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
                                    <i className="fa fa-comments"></i> Comments
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
                          <a
                            href="#"
                            className="page-link"
                            aria-label="Previous"
                            onClick={() =>
                              currentPage > 1 &&
                              handlePageClick(currentPage - 1)
                            }
                          >
                            <i className="ti-angle-left"></i>
                          </a>
                        </li>

                        {/* Page Numbers */}
                        {pages.map((page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              page === currentPage ? "active" : ""
                            }`}
                          >
                            <a
                              href="#"
                              className="page-link"
                              onClick={() => handlePageClick(page)}
                            >
                              {page}
                            </a>
                          </li>
                        ))}

                        {/* Next Button */}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <a
                            href="#"
                            className="page-link"
                            aria-label="Next"
                            onClick={() =>
                              currentPage < totalPages &&
                              handlePageClick(currentPage + 1)
                            }
                          >
                            <i className="ti-angle-right"></i>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}

                {item === tag && <>{handleCategory(currentProducts, tag)}</>}
              </div>

              <div className="col-lg-4">
                <div className="blog_right_sidebar">
                  <SearchBar setQuery={setQuery} />

                  <Category setItem={setItem} setTag={setTag} />
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
