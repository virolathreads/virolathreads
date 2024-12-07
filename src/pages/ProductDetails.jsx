import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { useCart } from "@/CartContext";
import { FaWhatsapp, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import PreLoader from "@/lib/PreLoader";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  const {
    addToCart,
    setQuantity,
    quantity,
    products,
    loader,
    setLoader,
    currency,
    handleAmountChange,
  } = useCart();

  useEffect(() => {
    setLoader(true);
    const selectedProduct =
      products && products.find((p) => p.title === productId);
    try {
      if (selectedProduct.title) {
        setProduct(selectedProduct);
        setMainImage(selectedProduct.images.edges[0]?.node.src || "");
        setSelectedVariant(selectedProduct?.variants?.edges[0]?.node); // Default to the first variant
        setSelectedColor(
          selectedProduct.variants.edges[0]?.node.selectedOptions[0]?.value ||
            ""
        ); // Default color
        setSelectedSize(selectedProduct.variants.edges[0]?.node.option2 || ""); // Default size
        setLoader(false);
      } else {
        console.warn("Product not found!");
        setLoader(false);
      }
    } catch (e) {
      console.error("Error fetching product:", e);
      // setLoader(false);
      // navigate("/404");
      return;
    }
  }, []);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(Math.max(1, quantity - 1));
  const handleBack = () => navigate(-1);
  const ck = product?.variants?.edges.find((variant) => variant); // Returns the first variant
  const cks = ck?.node.selectedOptions.map((opt) => opt);
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setMainImage(variant.image?.src || mainImage);
    setSelectedColor(variant.option1);
    setSelectedSize(variant.option2);
  };

  const isSoldOut = product?.variants?.edges[0]?.node.availableForSale;
  const sanitizedDescription = DOMPurify.sanitize(product?.description || "");
  const handleClick = () => navigate(`/cart`);

  if (!products && loader && !product) {
    return <PreLoader />;
  }

  return (
    <Layout>
      {/* Breadcrumb and Back Navigation */}
      <div className="page-notification page-notification2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav aria-label="breadcrumb ">
                <ol className="breadcrumb justify-content-start pt-12">
                  {/* <li className="breadcrumb-item " >
                    <FaArrowLeft />
                  </li> */}
                  <li
                    className="breadcrumb-item active font-medium"
                    aria-current="page"
                    style={{ cursor: "pointer" }}
                    onClick={handleBack}
                  >
                    {"<"} Go Back
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <motion.div
        className="product-details container"
        initial={{ x: "100%", opacity: 0 }} // Start position
        animate={{ x: 0, opacity: 1 }} // End position
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          duration: 1.5,
        }}
      >
        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="main-image mb-3 flex justify-center max-h-[auto] md:max-h-[auto]">
              <img
                src={mainImage}
                alt={product?.title}
                className="img-fluid border max-h-[auto] md:max-h-[auto] w-auto object-fit rounded "
              />
            </div>
            <div className="thumbnail-gallery d-flex gap-2 pb-96">
              {product?.images?.edges.map((img, index) => (
                <img
                  key={index}
                  src={img.node.src}
                  alt={`Gallery ${index}`}
                  className={`thumbnail img-fluid border ${
                    mainImage === img.node.src ? "border-[#000] border-2" : ""
                  }`}
                  onClick={() => setMainImage(img.node.src)}
                  style={{
                    cursor: "pointer",
                    opacity: mainImage === img.node.src ? 1 : 0.7,
                    width: "100px",
                    height: "auto",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6 pb-16" key={product?.id}>
            <p className="pt-12 uppercase text-xl pb-2"></p>
            <p className="text-5xl text-[#000] capitalize font-bold text-left">
              {product?.title}
            </p>
            <p
              className="mt-10 text-3xl"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>
            <div className="price text-3xl pt-4 font-semiBold">
              <span>
                {currency} {handleAmountChange(selectedVariant?.price.amount)}
              </span>
            </div>
            {!isSoldOut && (
              <span className="badge bg-danger ms-2">Sold Out</span>
            )}
            {cks?.length ? (
              cks.map((option, i) => (
                <div className="pt-8">
                  {option.name !== "Title" && (
                    <p className="text-3xl pb-3">{option.name}</p>
                  )}

                  {option.name !== "Color" &&
                    option.name !== "Size" &&
                    option.name !== "Title" && <p>{option.value}</p>}

                  {option.name === "Color" && (
                    <div className="color-options">
                      {" "}
                      <button
                        key={i}
                        style={{
                          backgroundColor: option.value,
                          border:
                            selectedColor === option.value
                              ? "2px solid #000"
                              : "border solid #000 5px",
                          text: "none",
                        }}
                        onClick={() => handleVariantChange(option.value)}
                      >
                        {option.value}
                      </button>
                    </div>
                  )}

                  {option.name === "Size" && (
                    <select
                      value={selectedSize}
                      onChange={(e) => handleVariantChange(e.target.value)}
                      disabled={!isSoldOut}
                    >
                      <option key={i} value={option.value}>
                        {option.value}
                      </option>
                    </select>
                  )}
                </div>
              ))
            ) : (
              <p className="text-lg text-red-600">No options available</p>
            )}
            {/* Quantity */}
            <p className="mt-8 text-2xl pb-3">Quantity</p>
            <div className="d-flex align-items-center gap-2">
              <button
                onClick={decrementQuantity}
                className="px-8 py-2 text-4xl border-2 border-[#000] text-[#000]"
              >
                -
              </button>
              <span className="px-6">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="px-8 py-2 text-4xl border-2 border-[#000] text-[#000]"
              >
                +
              </button>
            </div>
            {/* Add to Cart */}
            <button
              onClick={() =>
                isSoldOut && addToCart(product?.variants?.edges[0]?.node.id)
              }
              className="border-2 border-[#000] text-[#000] font-bold py-4 mt-10 w-[80%]"
            >
              {!isSoldOut ? "Sold Out" : "Add to Cart"}
            </button>
            {/* Buy Now */}
            <button
              className="text-[#fff] w-[80%] mt-10 font-semibold py-4 bg-[#000] "
              onClick={() => handleClick()}
            >
              Proceed to Checkout
            </button>{" "}
            {/* Social Share */}
            <p className="text-2xl pb-2 pt-20">Share on:</p>
            <div className="social-share mt-4 text-4xl flex flex-row items-center gap-4">
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}&text=${encodeURIComponent(
                      `Check out this product: ${product.title}`
                    )}`,
                    "_blank"
                  )
                }
                className=""
              >
                <FaXTwitter />
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  )
                }
                className=""
              >
                <FaFacebookF />
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      `Check this out: ${window.location.href}`
                    )}`,
                    "_blank"
                  )
                }
                className=""
              >
                <FaWhatsapp />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ProductDetails;
