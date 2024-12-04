import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import ContactForm from "@/components/ContactForm";
import RecentProducts from "@/components/RecentProducts";
import { useCart } from "@/CartContext";
import { FaNairaSign } from "react-icons/fa6";

export default function Shop() {
  const navigate = useNavigate();
  const { addToCart, products, quantity, setQuantity } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [maxPrice, setMaxPrice] = useState(1000);
  const productsPerPage = 5;

  useEffect(() => {
    if (products.length > 0) {
      const maxProductPrice = Math.max(
        ...products.map((prod) =>
          parseFloat(prod.variants[0]?.price.amount || 0)
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
    const price = parseFloat(prod.variants[0]?.price.amount || 0);
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    const matchesQuery =
      prod.title.toLowerCase().includes(query.toLowerCase()) ||
      prod.description.toLowerCase().includes(query.toLowerCase());
    return matchesPrice && matchesQuery;
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
    navigate(`/product/${encodeURIComponent(productId)}`);
  };

  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    const newRange = [...priceRange];
    newRange[name === "min" ? 0 : 1] = parseFloat(value);
    setPriceRange(newRange);
    setCurrentPage(1); // Reset to the first page after filtering
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
            <div className="col-xl-3 col-lg-3 col-md-4">
              <div className="blog_right_sidebar">
                <SearchBar setQuery={setQuery} />

                {/* Price Filter */}
                <div className="price-filter mt-4 w-full">
                  <h5>Filter by Price</h5>
                  <div className="price-range-slider text-4xl pt-4 flex flex-col gap-4 items-start">
                    <label className="flex flex-col gap-2">
                      <p className="flex flex-row gap-2 items-center">
                        Min Price:
                        <p className="flex flex-row items-center">
                          <FaNairaSign />
                          {priceRange[0]}
                        </p>
                      </p>

                      <input
                        type="range"
                        name="min"
                        min="0"
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={handlePriceChange}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <p className="flex flex-row gap-2 items-center">
                        Max Price:
                        <p className="flex flex-row items-center">
                          <FaNairaSign />
                          {priceRange[1]}
                        </p>
                      </p>
                      <input
                        type="range"
                        name="max"
                        min="0"
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                      />
                    </label>
                  </div>
                </div>

                <RecentProducts
                  lifoItems={sortedProduct.slice(0, 3)}
                  handleClick={handleClick}
                />
                <ContactForm />
              </div>
            </div>

            {/* Product List */}
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div className="new-arrival new-arrival2">
                <div className="row">
                  {currentProducts.length > 0 ? (
                    currentProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="col-xl-4 col-lg-4 col-md-6 col-sm-6"
                      >
                        <div className="single-new-arrival mb-50 text-center">
                          <div
                            onClick={() => handleClick(prod.title)}
                            className="popular-img"
                          >
                            <img src={prod.images[0]?.src} alt="" />
                            <div
                              className="favorit-items"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation
                                setQuantity(1);
                                addToCart(prod.variants[0].id, quantity);
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
                              <a onClick={() => handleClick(prod.id)}>
                                {prod.title.toUpperCase()}
                              </a>
                            </h3>
                            <div className="rating mb-10">
                              <p>{prod.description}</p>
                            </div>
                            <span>
                              {prod.variants[0]?.price.currencyCode}{" "}
                              {prod.variants[0]?.price.amount.toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
