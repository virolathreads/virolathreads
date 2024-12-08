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
  const [selectedGender, setSelectedGender] = useState("");
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
          const initialVariant = selectedProduct.variants[0];
          setSelectedVariant(initialVariant);
          setSelectedColor(initialVariant?.option1 || "");
          setSelectedSize(initialVariant?.option2 || "");
          setSelectedGender(initialVariant?.option3 || "");
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

  const handleVariantChange = (optionName, value) => {
    const updatedVariant = product.variants.find(
      (variant) =>
        variant.option1 === (optionName === "Color" ? value : selectedColor) &&
        variant.option2 === (optionName === "Size" ? value : selectedSize) &&
        variant.option3 === (optionName === "Gender" ? value : selectedGender)
    );

    if (updatedVariant) {
      setSelectedVariant(updatedVariant);
      setMainImage(updatedVariant.image?.src || mainImage);
      if (optionName === "Color") setSelectedColor(value);
      if (optionName === "Size") setSelectedSize(value);
      if (optionName === "Gender") setSelectedGender(value);
    }
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

  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(
        selectedVariant.id,
        quantity,
        selectedColor,
        selectedSize,
        selectedGender
      );
    }
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
              {product.images.map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={`Gallery ${img.src}`}
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
          <div className="col-lg-6 pt-16 pb-[5rem]">
            <p className="text-5xl text-[#000] capitalize font-bold text-left">
              {product?.title}
            </p>
            <p
              className="mt-10 text-3xl"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>
            <div className="price">
              {isOnSale ? (
                <>
                  <span className="text-danger text-decoration-line-through">
                    {selectedVariant.compareAtPrice?.currencyCode}{" "}
                    {selectedVariant.compareAtPrice?.amount}
                  </span>
                  <span className="text-success ms-2">
                    {selectedVariant.price?.currencyCode}{" "}
                    {selectedVariant.price?.amount}
                  </span>
                </>
              ) : (
                <span>
                  {selectedVariant.price?.currencyCode}{" "}
                  {selectedVariant.price?.amount}
                </span>
              )}
            </div>
            {isSoldOut && <span className="badge bg-danger">Sold Out</span>}

            {/* Color Options */}
            {/* <div>
              <p>Color</p>
              <div className="d-flex gap-2">
                {product.options[0].values.map((color) => (
                  <button
                    key={color}
                    style={{
                      backgroundColor: color,
                      width: "25px",
                      height: "25px",
                      border:
                        selectedColor === color
                          ? "2px solid #000"
                          : "1px solid #ccc",
                    }}
                    onClick={() => handleVariantChange("Color", color)}
                  ></button>
                ))}
              </div>
            </div> */}

            {/* Size Options */}
            {product.options[0].name === "Size" ? (
              <div className="pt-8">
                <p className="text-3xl">{product.options[0].name}</p>
                <select
                  value={selectedSize}
                  onChange={(e) => handleVariantChange("Size", e.target.value)}
                  disabled={isSoldOut}
                  className="mt-4"
                >
                  {product.options[0].values.map((size) => (
                    <option value={size.value}>{size.value}</option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}

            {/* Gender Options */}
            {/* <div>
              <p>Gender</p>
              <select
                value={selectedGender}
                onChange={(e) => handleVariantChange("Gender", e.target.value)}
                disabled={isSoldOut}
              >
                {product.options[2].values.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div> */}

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
              onClick={() => isSoldOut && handleAddToCart}
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
            </button>

            {/* Social Share */}
            <div className="social-share pt-8">
              <p className="text-3xl pb-3">Share this product</p>
              <div className="d-flex gap-3">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="share-icon"
                >
                  <FaWhatsapp size={24} />
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="share-icon"
                >
                  <FaFacebookF size={24} />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="share-icon"
                >
                  <FaXTwitter size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
