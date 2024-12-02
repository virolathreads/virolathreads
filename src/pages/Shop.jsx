import React, { useEffect, useState } from "react";
import shopifyClient from "./shopifyClient";
import Layout from "../layouts/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import RecentPost from "@/components/RecentPost";
import Category from "@/components/Category";
import Newsletter from "@/components/Newsletter";
import ContactForm from "@/components/ContactForm";
import RecentProducts from "@/components/RecentProducts";
import Swal from "sweetalert2";
import { useCart } from "@/CartContext";

export default function Shop() {
  const { cart, setCart, addToCart, products } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [tag, setTag] = useState("");

  const [item, setItem] = useState("all");
  const [query, setQuery] = useState("");
  const productsPerPage = 5;

  // handle new products on top
  //handle pagination
  const sortedProduct =
    products && products.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Calculate the indices of the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //current products is the real product list
  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Handle page change
  const lifoItems = [...currentProducts].slice(0, 3);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (blog) => {
    navigate(`/blog/${blog}`);
  };

  return (
    <Layout>
      <div class="page-notification">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb justify-content-center">
                  <li class="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#">Shop</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="category-area">
        <div class="container">
          <div class="row">
            <div class="col-xl-7 col-lg-8 col-md-10">
              <div class="section-tittle mb-50">
                <h2>Shop with us</h2>
                <p>Browse from 230 latest items</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-3 col-lg-3 col-md-4 ">
              <div className="blog_right_sidebar">
                <SearchBar setQuery={setQuery} />

                {/* <Category setItem={setItem} setTag={setTag} /> */}
                {/** Popular Posts Widget */}
                <RecentProducts
                  lifoItems={lifoItems}
                  handleClick={handleClick}
                />

                {/** Instagram Feeds Widget */}
                {/* <IgFeeds /> */}

                {/** Newsletter Widget */}
                <ContactForm />
              </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-8 ">
              <div class="new-arrival new-arrival2">
                <div class="row">
                  {currentProducts &&
                    currentProducts.map((prod) => {
                      return (
                        <div
                          key={prod.id}
                          class="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                        >
                          <div class="single-new-arrival mb-50 text-center">
                            <div class="popular-img">
                              <img src={prod.images[0]?.src} alt="" />
                              <div
                                class="favorit-items"
                                onClick={() => addToCart(prod.variants[0].id)}
                              >
                                <span class="flaticon-heart"></span>
                                <img
                                  src="assets/img/gallery/favorit-card.png"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div class="popular-caption">
                              <h3>
                                <a href="product_details.html">
                                  {prod.title.toUpperCase()}
                                </a>
                              </h3>
                              <div class="rating mb-10">
                                <p> {prod.description}</p>
                              </div>
                              <span>
                                {" "}
                                {prod.variants[0]?.price.currencyCode}{" "}
                                {prod.variants[0]?.price.amount}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* pagination */}
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
                          currentPage > 1 && handlePageClick(currentPage - 1)
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
