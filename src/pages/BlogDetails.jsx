import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import CommentForm from "@/components/CommentForm";
import RecentPost from "@/components/RecentPost";
import Newsletter from "@/components/Newsletter";
import CommentList from "@/components/CommentList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

function BlogDetails() {
  const fullUrl = window.location.href;

  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const [blog, setBlog] = useState("");
  const [mainImage, setMainImage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "blog"));
    const blogList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBlog(blogList);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const product = blog && blog.find((p) => p.id.toString() === id);
  console.log(product);
  const productsPerPage = 5;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = blog.slice(indexOfFirstProduct, indexOfLastProduct);

  const lifoItems = [...currentProducts].reverse().slice(0, 3);
  const handleClick = (blog) => {
    navigate(`/blog/${blog}`);
  };

  useEffect(() => {
    if (product && product.imageUrls.length > 0) {
      setMainImage(product.imageUrls[0]);
    }
  }, [product]);
  // const handleImageClick = (url) => {
  //   setMainImage(url);
  // };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      fullUrl
    )}&text=${encodeURIComponent(product.title)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      fullUrl
    )}`;
    window.open(linkedInUrl, "_blank", "width=600,height=400");
  };

  const sanitizedContent = DOMPurify.sanitize(product.content);
  if (!product) {
    return (
      <div>
        {" "}
        <SkeletonTheme baseColor="#ffffff" highlightColor="#a33e21">
          <p>
            <Skeleton count={40} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <Layout>
      <>
        <div class="page-notification page-notification2">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb justify-content-center">
                    <li class="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">Blog Details</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <section class="blog_area single-post-area section-padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 posts-list">
                <div class="single-post">
                  <div class="feature-img">
                    <img class="img-fluid" src={product.imageUrls} alt="" />
                  </div>

                  <div class="blog_details">
                    <h2>{product.title}</h2>
                    <ul class="blog-info-link mt-3 mb-4">
                      <li>
                        <a href="#">
                          <i class="fa fa-user"></i> {product.category}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-comments"></i>{" "}
                          {product.comments && product.comments.length}{" "}
                          {product.comments && product.comments.length < 2
                            ? "Comment"
                            : "Comments"}
                        </a>
                      </li>
                    </ul>
                    <p class="excert">{product.description}</p>

                    <div class="quote-wrapper">
                      <div
                        class="quotes"
                        dangerouslySetInnerHTML={{
                          __html: sanitizedContent,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="navigation-top">
                  <div class="d-sm-flex justify-content-between text-center">
                    {" "}
                    SHARE TO FRIENDS
                    <ul class="social-icons">
                      <li onClick={shareOnFacebook}>
                        <i
                          class="fab fa-facebook "
                          onClick={shareOnFacebook}
                        ></i>
                      </li>
                      <li onClick={shareOnLinkedIn}>
                        <i
                          class="fab fa-linkedin"
                          onClick={shareOnLinkedIn}
                        ></i>
                      </li>
                      <li onClick={shareOnTwitter}>
                        <i class="fab fa-twitter" onClick={shareOnTwitter}></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <CommentList comment={product.comments} />
                <CommentForm id={product.id} fetchComments={fetchProducts} />
              </div>
              <div class="col-lg-4">
                <div class="blog_right_sidebar">
                  <RecentPost lifoItems={lifoItems} handleClick={handleClick} />

                  {/* <IgFeeds /> */}
                  <Newsletter />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
}

export default BlogDetails;
