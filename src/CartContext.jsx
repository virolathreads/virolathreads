import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "./pages/shopifyClient";
import Swal from "sweetalert2";
import axios from "axios";
import PreLoader from "./lib/PreLoader";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);
  const [tag, setTag] = useState("");
  
  const [item, setItem] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [maxPrice, setMaxPrice] = useState(1000);

  const [loads, setLoads] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState(
    localStorage.getItem("Virolacurrency") || "£"
  );

  const [checkoutId, setCheckoutId] = useState(
    localStorage.getItem("checkoutId")
  );
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchCountry() {
      setLoads(true);
      try {
        const response = await fetch(
          "https://ipinfo.io/json?token=d47e87dea8cf70"
        );
        const data = await response.json();
        if (data) {
          if (localStorage.getItem("Virolacurrency") === "£") {
            localStorage.setItem("Virolacurrency", "£");
            setCurrency("£");
          } else if (localStorage.getItem("Virolacurrency") === "₦") {
            localStorage.setItem("Virolacurrency", "₦");
            setCurrency("₦");
          } else {
            if (data.country === "NG") {
              localStorage.setItem("Virolacurrency", "₦");
              setCurrency("₦");
            } else {
              localStorage.setItem("Virolacurrency", "£");
              setCurrency("£");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching country:", error);
      } finally {
        setLoads(false);
      }
    }

    fetchCountry();

    async function fetchAllProducts() {
      setLoader(true);
      let allProducts = [];
      let hasNextPage = true;
      let cursor = null;

      while (hasNextPage) {
        try {
          const response = await axios.post(
            "https://91hjvt-c0.myshopify.com/api/2023-10/graphql.json",
            {
              query: `
                query ($first: Int!, $cursor: String) {
                  products(first: $first, after: $cursor) {
                    pageInfo {
                      hasNextPage
                    }
                    edges {
                      cursor
                      node {
                        id
                        title
                        tags
                        description
                        vendor
                        productType
                        handle
                        images(first: 10) {
                          edges {
                            node {
                              id
                              altText
                              src: url
                              width
                              height
                            }
                          }
                        }
                        variants(first: 10) {
                          edges {
                            node {
                              id
                              title
                              sku
                              price {
                                amount
                                currencyCode
                              }
                              compareAtPrice {
                                amount
                                currencyCode
                              }
                              availableForSale
                              selectedOptions {
                                name
                                value
                              }
                              image {
                                id
                                altText
                                src: url
                                width
                                height
                              }
                            }
                          }
                        }
                        options {
                          id
                          name
                          values
                        }
                      }
                    }
                  }
                }
              `,
              variables: { first: 250, cursor }, // Pagination with smaller batch size
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token":
                  "7d25e50b36cb469b6fc5b89398f6ceb7",
              },
            }
          );

          const products =
            response.data?.data?.products?.edges?.map((edge) => edge.node) ||
            [];
          allProducts = [...allProducts, ...products];
          hasNextPage =
            response.data?.data?.products?.pageInfo?.hasNextPage || false;
          cursor =
            response.data?.data?.products?.edges?.slice(-1)[0]?.cursor || null;
        } catch (error) {
          console.error("Error fetching products via Axios:", error);
          break;
        }
      }

      return allProducts;
    }

    fetchAllProducts()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);

        setLoader(false);
      })
      .catch((error) => console.error("Error fetching products:", error));

    if (!checkoutId) {
      shopifyClient.checkout.create().then((checkout) => {
        setCheckoutId(checkout.id);
        localStorage.setItem("checkoutId", checkout.id);
      });
    }
    
  }, [checkoutId]);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("Virolacurrency", newCurrency);
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
  };
  const handleAmountChange = (amount) => {
    if (amount == null || isNaN(amount)) {
      console.error("Invalid amount:", amount);
      return "Invalid amount";
    }

    if (currency === "£") {
      const finalAmount = amount / 2300;
      return `${Number(finalAmount).toFixed(2)}`;
    } else if (currency === "₦") {
      return `${Number(amount)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    } else {
      console.warn("Unsupported or default currency:", currency);
      return amount.toFixed(2);
    }
  };
  const getSizes = (variants) => {
    return variants?.edges.map((edge) => {
      const sizeOption = edge.node.selectedOptions.find(
        (opt) => opt.name === "Size"
      );

      return {
        size: sizeOption ? sizeOption.value : null,
        id: edge.node.id, // Store the variant ID for adding to cart later
        price: edge.node.price.amount, // Store price for display
        available: edge.node.availableForSale, // Check availability
      };
    });
  };

 

  if (loads) {
    return <PreLoader />;
  }
  const addToCart = (variantId) => {
    console.log(variantId)
    if (!checkoutId) {
      Swal.fire({
        title: "Error",
        text: "Checkout session is not initialized yet!",
        icon: "error",
      });
      return;
    }

    shopifyClient.checkout
      .addLineItems(checkoutId, [
        {
          variantId,
          quantity,
        },
      ])
      .then((updatedCheckout) => {
        setCart(updatedCheckout);
        Swal.fire({
          title: "Added to Cart!",
          text: "The item has been added to your cart.",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Go to Cart",
          cancelButtonText: "Continue Shopping",
          customClass: {
            confirmButton: "swal-btn-confirm",
            cancelButton: "swal-btn-cancel",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/cart"; // Navigate to cart page
          }
        });
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        checkoutId,
        setCheckoutId,
        products,
        filteredProducts, // Expose filtered products
        setQuantity,
        quantity,
        setLoader,
        loader,
        load,
        setLoad,
        handleCurrencyChange,
        currency,
        handleAmountChange,
        priceRange,
        setPriceRange,
        maxPrice,
        setMaxPrice,
        getSizes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the Cart Context
export const useCart = () => useContext(CartContext);
