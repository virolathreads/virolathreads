import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import RecentPost from "@/components/RecentPost";
import Category from "@/components/Category";
import Newsletter from "@/components/Newsletter";

export default function Shop() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [tag, setTag] = useState("");
  const [blogs, setBlogs] = useState("");
  const [item, setItem] = useState("all");
  const [query, setQuery] = useState("");
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "product"));
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
  console.log(currentProducts);

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

                <Category setItem={setItem} setTag={setTag} />
                {/** Popular Posts Widget */}
                <RecentPost lifoItems={lifoItems} handleClick={handleClick} />

                {/** Instagram Feeds Widget */}
                {/* <IgFeeds /> */}

                {/** Newsletter Widget */}
                <Newsletter />
              </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-8 ">
              <div class="new-arrival new-arrival2">
                <div class="row">
                  {currentProducts &&
                    currentProducts.map((prod) => {
                      return (
                        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                          <div class="single-new-arrival mb-50 text-center">
                            <div class="popular-img">
                              <img src={prod.imageUrls} alt="" />
                              <div class="favorit-items">
                                <span class="flaticon-heart"></span>
                                <img
                                  src="assets/img/gallery/favorit-card.png"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div class="popular-caption">
                              <h3>
                                <a href="product_details.html">{prod.title}</a>
                              </h3>
                              <div class="rating mb-10">
                                <p> {prod.description}</p>
                              </div>
                              <span>₦ {prod.price + "." + "00"}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div class="row justify-content-center">
                  <div class="room-btn mt-20">
                    <a href="catagori.html" class="border-btn">
                      Browse More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
