import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";

import RecentProducts from "@/components/RecentProducts";
import { useCart } from "@/CartContext";
import ShopCategory from "@/components/ShopCategory";
import { FaBagShopping } from "react-icons/fa6";

export default function Shop() {
  const navigate = useNavigate();
  const { addToCart, products, currency, handleAmountChange } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [item, setItem] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [maxPrice, setMaxPrice] = useState(1000);
  const productsPerPage = 10;

  useEffect(() => {
    if (products.length > 0) {
      const maxProductPrice = Math.max(
        ...products.map((prod) =>
          parseFloat(
            handleAmountChange(prod.variants.edges[0]?.node.price.amount || 0)
          )
        )
      );
      setMaxPrice(maxProductPrice);
      setPriceRange([0, maxProductPrice]);
    }
  }, [products]);

  // Sort products by newest
  const sortedProduct =
    products && products.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filter products by price range
  const filteredProducts = sortedProduct.filter((prod) => {
    const price = parseFloat(
      handleAmountChange(prod.variants.edges[0]?.node.price.amount || 0)
    );
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    const newRange = [...priceRange];
    newRange[name === "min" ? 0 : 1] = parseFloat(handleAmountChange(value));
    setPriceRange(newRange);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleCategory = (catag) => {
    // console.log(catag);
    const tagsToFilter = [catag];
    const filteredProducts = products.filter((product) =>
      product.tags.some((tag) => tagsToFilter.includes(tag))
    );
    const sortedBlogs =
      filteredProducts &&
      filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const filteredProductPrice = sortedBlogs.filter((prod) => {
      const price = parseFloat(
        handleAmountChange(prod.variants.edges[0]?.node.price.amount || 0)
      );
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Now slice the sorted array to get the current page's products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProductPrice.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    const totalPage = Math.ceil(filteredProductPrice.length / productsPerPage);
    const nopage = Array.from({ length: totalPage }, (_, index) => index + 1);

    return (
      <>
        <div className="col-xl-9 col-lg-9 col-md-8 order-1 sm:order-2">
          <div className="new-arrival new-arrival2">
            <div className="row">
              {currentProducts.length > 0 ? (
                currentProducts
                  .filter((produc) => {
                    if (
                      query == "" ||
                      produc.title
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      produc.description
                        .toLowerCase()
                        .includes(query.toLowerCase())
                    ) {
                      return true; // This product matches the query or query is empty
                    }
                    return false; // This product does not match the query
                  })
                  .map((prod, index) => (
                    <motion.div
                      key={prod.id}
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                      initial={{ x: index % 2 === 0 ? -200 : 200, opacity: 0 }} // Initial position (left for even, right for odd)
                      animate={{ x: 0, opacity: 1 }} // Final position (slide to 0)
                      transition={{
                        type: "spring",
                        stiffness: 50,
                        delay: index * 0.1,
                      }} // Delay each element slightly
                    >
                      <div className="single-new-arrival mb-50 text-center">
                        <div
                          onClick={() => handleClick(prod.title)}
                          className="popular-img"
                        >
                          <img
                            key={prod.images.edges[0]?.node.id}
                            src={prod.images.edges[0]?.node.src}
                            alt={prod.images.edges[0]?.node.altText}
                            width={100}
                          />
                          <div
                            className="favorit-items"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent navigation
                              addToCart(prod?.variants?.edges[0]?.node.id);
                            }}
                          >
                            <span className="flaticon-heart"></span>
                            <img
                              src="assets/img/gallery/favorit-card.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="popular-caption">
                          <h3>
                            <a onClick={() => handleClick(prod.title)}>
                              {prod.title.toUpperCase()}
                            </a>
                          </h3>
                          <p
                            className={
                              !prod?.variants?.edges[0]?.node.availableForSale
                                ? "badge bg-danger ms-2 text-[#000]"
                                : "badge bg-info ms-2 text-[#000]"
                            }
                          >
                            {prod?.variants?.edges[0]?.node.availableForSale
                              ? " IN STOCK"
                              : "SOLD OUT"}
                          </p>
                          <div className="rating mb-10">
                            <p>{prod.description}</p>
                          </div>
                          <span>
                            {handleAmountChange(
                              prod.variants.edges[0].node.price.amount
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            {currency}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
              ) : (
                <p>No products found in this price range.</p>
              )}
            </div>

            {/* Pagination */}
            <nav className="blog-pagination justify-content-center d-flex">
              <ul className="pagination">
                {/* Previous Button */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
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
                {nopage.map((page) => (
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
                    currentPage === totalPage ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={() =>
                      currentPage < totalPage &&
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
      </>
    );
  };
  return (
    <Layout>
      <div className="page-notification">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Shop</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="category-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-8 col-md-10">
              <div className="section-tittle mb-50">
                <h2>Shop with us</h2>
                <p>Browse from {filteredProducts.length} items</p>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-3 col-md-4 order-2 sm:order-1">
              <div className="blog_right_sidebar">
                {/* Price Filter */}
                <aside className="single_sidebar_widget post_category_widget">
                  <h4 className="widget_title" style={{ color: "#2d2d2d" }}>
                    Filter by Price
                  </h4>

                  <div className="price-range-slider">
                    <label className="font-light">
                      Min Price: {currency} {handleAmountChange(priceRange[0])}
                      <input
                        type="range"
                        name="min"
                        min="0"
                        max={handleAmountChange(maxPrice)}
                        value={handleAmountChange(priceRange[0])}
                        onChange={handlePriceChange}
                      />
                    </label>
                    <label className="font-light">
                      Max Price: {currency} {priceRange[1]}
                      <input
                        type="range"
                        name="max"
                        min="0"
                        max={handleAmountChange(maxPrice)}
                        value={handleAmountChange(priceRange[1])}
                        onChange={handlePriceChange}
                      />
                    </label>
                  </div>
                </aside>
                <SearchBar setQuery={setQuery} />
                <ShopCategory
                  setItem={setItem}
                  setTag={setTag}
                  currentProducts={sortedProduct}
                />

                <RecentProducts
                  lifoItems={sortedProduct.slice(0, 3)}
                  handleClick={handleClick}
                />
                <ContactForm />
              </div>
            </div>

            {/* Product List */}
            {item === "all" && (
              <div className="col-xl-9 col-lg-9 col-md-8 order-1 sm:order-2">
                <div className="new-arrival new-arrival2">
                  <div className="row">
                    {currentProducts.length > 0 ? (
                      currentProducts
                        .filter((produc) => {
                          if (
                            query == "" ||
                            produc.title
                              .toLowerCase()
                              .includes(query.toLowerCase()) ||
                            produc.description
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          ) {
                            return true; // This product matches the query or query is empty
                          }
                          return false; // This product does not match the query
                        })
                        .map((prod, index) => (
                          <motion.div
                            key={prod.id}
                            className="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                            initial={{
                              x: index % 2 === 0 ? -200 : 200,
                              opacity: 0,
                            }} // Initial position (left for even, right for odd)
                            animate={{ x: 0, opacity: 1 }} // Final position (slide to 0)
                            transition={{
                              type: "spring",
                              stiffness: 50,
                              delay: index * 0.1,
                            }} // Delay each element slightly
                          >
                            <div className="single-new-arrival mb-50 text-center">
                              <div
                                onClick={() => handleClick(prod.title)}
                                className="popular-img"
                              >
                                <img
                                  key={prod.images.edges[0]?.node.id}
                                  src={prod.images.edges[0]?.node.src}
                                  alt={prod.images.edges[0]?.node.altText}
                                  width={100}
                                />
                                <div
                                  className="favorit-items"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigation
                                    addToCart(
                                      prod?.variants?.edges[0]?.node.id
                                    );
                                  }}
                                >
                                  <span className="flaticon-heart"></span>
                                  {/* <img
                                    src="assets/img/gallery/favorit-card.png"
                                    alt=""
                                  /> */}
                                  <div className="bag-icon-container">
                                    <FaBagShopping />
                                  </div>
                                </div>
                              </div>
                              <div className="popular-caption">
                                <h3>
                                  <a onClick={() => handleClick(prod.title)}>
                                    {prod.title.toUpperCase()}
                                  </a>
                                </h3>
                                <p
                                  className={
                                    !prod?.variants?.edges[0]?.node
                                      .availableForSale
                                      ? "badge bg-danger ms-2 text-[#000]"
                                      : "badge bg-info ms-2 text-[#000]"
                                  }
                                >
                                  {prod?.variants?.edges[0]?.node
                                    .availableForSale
                                    ? " IN STOCK"
                                    : "SOLD OUT"}
                                </p>
                                <div className="rating mb-10">
                                  <p>{prod.description}</p>
                                </div>
                                <span>
                                  {handleAmountChange(
                                    prod.variants.edges[0].node.price.amount
                                  ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                  {currency}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))
                    ) : (
                      <p>No products found in this price range.</p>
                    )}
                  </div>

                  {/* Pagination */}
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
            )}

            {item === tag && <>{handleCategory(tag)}</>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
