import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { FaArrowLeft } from "react-icons/fa";
import shopifyClient from "./shopifyClient";
import { useCart } from "@/CartContext";
import { FaWhatsapp, FaXTwitter, FaFacebookF } from "react-icons/fa6";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();

  const { addToCart, setQuantity, quantity } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await shopifyClient.product.fetchAll();
        const selectedProduct = products.find((p) => p.title === productId);

        if (selectedProduct) {
          setProduct(selectedProduct);
          setMainImage(selectedProduct.images[0]?.src || "");
          setSelectedVariant(selectedProduct.variants[0]); // Default to the first variant
          setSelectedColor(selectedProduct.variants[0]?.option1 || ""); // Default color
          setSelectedSize(selectedProduct.variants[0]?.option2 || ""); // Default size
        } else {
          console.warn("Product not found!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(Math.max(1, quantity - 1));

  const handleBack = () => navigate(-1);
  const ck = product?.variants.find((variant) => variant); // Returns the first variant

  const cks = ck?.selectedOptions.map((opt) => opt);

  console.log(ck, "this is", cks);
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setMainImage(variant.image?.src || mainImage);
    setSelectedColor(variant.option1);
    setSelectedSize(variant.option2);
  };

  if (loading) {
    return (
      <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e0e0e0">
        <p>
          <Skeleton count={10} />
        </p>
      </SkeletonTheme>
    );
  }

  if (!product || !selectedVariant) {
    return <div>Product not found</div>;
  }

  const isSoldOut = selectedVariant.inventoryQuantity === 0;
  const isOnSale =
    selectedVariant.compareAtPrice &&
    selectedVariant.compareAtPrice > selectedVariant.price;

  const sanitizedDescription = DOMPurify.sanitize(
    product.descriptionHtml || ""
  );

  const handleClick = () => {
    navigate(`/cart`);
  };

  return (
    <Layout>
      {/* Breadcrumb and Back Navigation */}
      <div className="page-notification page-notification2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav aria-label="breadcrumb ">
                <ol className="breadcrumb justify-content-start pt-12">
                  <li className="breadcrumb-item " onClick={handleBack}>
                    <FaArrowLeft />
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Go Back
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details container">
        <div className="row">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="main-image mb-3 flex justify-center max-h-[auto] md:max-h-[auto]">
              <img
                src={mainImage}
                alt={product.title}
                className="img-fluid border max-h-[auto] md:max-h-[auto] w-auto object-fit rounded "
              />
            </div>
            <div className="thumbnail-gallery d-flex gap-2 pb-96">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={`Gallery ${index}`}
                  className={`thumbnail img-fluid border ${
                    mainImage === img.src ? "border-[#000] border-2" : ""
                  }`}
                  onClick={() => setMainImage(img.src)}
                  style={{
                    cursor: "pointer",
                    opacity: mainImage === img.src ? 1 : 0.7,
                    width: "100px",
                    height: "auto",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6 pb-16">
            <p className="pt-12 uppercase text-xl pb-2"></p>
            <p className="text-5xl text-[#000] capitalize font-bold text-left">
              {product.title}
            </p>
            <p
              className="mt-10 text-3xl"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>
            <div className="price text-3xl pt-4 font-semiBold">
              {isOnSale ? (
                <>
                  <span className="text-danger text-decoration-line-through">
                    {selectedVariant.compareAtPrice.currencyCode}{" "}
                    {selectedVariant.compareAtPrice.amount}
                  </span>
                  <span className="text-success ms-2">
                    {selectedVariant.price.currencyCode}{" "}
                    {selectedVariant.price.amount}
                  </span>
                  <span className="badge bg-success ms-2">Sale</span>
                </>
              ) : (
                <span>
                  {selectedVariant.price.currencyCode}{" "}
                  {selectedVariant.price.amount}
                </span>
              )}
            </div>
            {isSoldOut && (
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
                      disabled={isSoldOut}
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
                !isSoldOut && addToCart(selectedVariant.id, quantity)
              }
              className="border-2 border-[#000] text-[#000] font-bold py-4 mt-10 w-[80%]"
              disabled={isSoldOut}
            >
              {isSoldOut ? "Sold Out" : "Add to Cart"}
            </button>

            {/* Buy Now */}
            <button
              className="text-[#fff] w-[80%] mt-10 font-semibold py-4 bg-[#000] "
              onClick={() => handleClick()}
            >
              Proceed to Checkout
            </button>

            {/* Product Description */}

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
      </div>
    </Layout>
  );
};

export default ProductDetails;
