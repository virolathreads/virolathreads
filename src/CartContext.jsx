import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "./pages/shopifyClient";
import Swal from "sweetalert2";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState(
    localStorage.getItem("checkoutId")
  );
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
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
              variables: { first: 50, cursor }, // Pagination with smaller batch size
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

  const addToCart = (variantId) => {
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the Cart Context
export const useCart = () => useContext(CartContext);
