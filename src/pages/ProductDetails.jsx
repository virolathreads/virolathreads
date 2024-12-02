const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await shopifyClient.product.fetchAll();
        const selectedProduct = products.find((p) => p.id === productId);

        if (selectedProduct) {
          setProduct(selectedProduct);
          setMainImage(selectedProduct.images[0]?.src || "");
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

  if (loading) {
    return (
      <SkeletonTheme baseColor="#f5f5f5" highlightColor="#e0e0e0">
        <p>
          <Skeleton count={10} />
        </p>
      </SkeletonTheme>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const variant = product.variants[0];
  const isSoldOut = variant?.inventoryQuantity === 0;
  const isOnSale =
    variant?.compareAtPrice &&
    parseFloat(variant.compareAtPrice.amount) >
      parseFloat(variant.price.amount);

  const sanitizedDescription = DOMPurify.sanitize(
    product.descriptionHtml || ""
  );

  return (
    <Layout>
      <div className="page-notification page-notification2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <button
                className="btn btn-back h-[40px] flex flex-row items-center gap-2"
                onClick={handleBack}
              >
                <FaArrowLeft />
                <p className="text-[#fff] text-2xl font-bold"> Back </p>
              </button>
              <nav aria-label="breadcrumb ">
                <ol className="breadcrumb justify-content-start pt-12">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {product.title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details container">
        <div className="row">
          <div className="col-lg-6">
            <div className="main-image mb-3 flex justify-center max-h-[400px]">
              <img
                src={mainImage}
                alt={product.title}
                className="img-fluid border w-[75%] max-h-[350px] object-fit rounded"
              />
            </div>
            <div className="thumbnail-gallery d-flex gap-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={`Gallery ${index}`}
                  className={`thumbnail img-fluid border ${
                    mainImage === img.src ? "active-thumbnail" : ""
                  }`}
                  onClick={() => setMainImage(img.src)}
                  style={{
                    cursor: "pointer",
                    opacity: mainImage === img.src ? 1 : 0.7,
                    width: "60px",
                    height: "60px",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-6 pb-16">
            <p className="pt-12 uppercase text-xl pb-2">Virola threads</p>
            <p className="text-4xl text-[#000] font-bold text-left">
              {product.title}
            </p>
            <div className="price pt-4">
              {isOnSale ? (
                <>
                  <span className="text-danger text-decoration-line-through">
                    {variant.compareAtPrice.currencyCode}{" "}
                    {variant.compareAtPrice.amount}
                  </span>
                  <span className="text-success ms-2">
                    {variant.price.currencyCode} {variant.price.amount}
                  </span>
                  <span className="badge bg-success ms-2">Sale</span>
                </>
              ) : (
                <span>
                  {variant.price.currencyCode} {variant.price.amount}
                </span>
              )}
            </div>
            {isSoldOut && (
              <span className="badge bg-danger ms-2">Sold Out</span>
            )}

            <p className="mt-4 mb-2">Quantity</p>
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

            <button
              onClick={() => !isSoldOut && addToCart(variant.id, quantity)}
              className="border-2 border-[#000] text-[#000] font-bold py-4 mt-4 w-100"
              disabled={isSoldOut}
            >
              {isSoldOut ? "Sold Out" : "Add to Cart"}
            </button>

            <button className="text-[#fff] mt-6 font-semibold py-4 bg-[#000] w-full">
              Buy now
            </button>

            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></p>

            <div className="social-share mt-4 flex flex-row gap-4">
              <button
                onClick={() =>
                  window.open(
                    `https://www.instagram.com/?url=${encodeURIComponent(
                      window.location.href
                    )}`,
                    "_blank"
                  )
                }
                className="bg-[#000] text-[#fff] py-4 w-full"
              >
                Share on Instagram
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
                className="bg-[#000] text-[#fff] py-4 w-full"
              >
                Share on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
