import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "./pages/shopifyClient";
import Swal from "sweetalert2";
import axios from "axios";
import PreLoader from "./lib/PreLoader";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState(
    localStorage.getItem("Virolacurrency") || "NGN"
  );

  const [checkoutId, setCheckoutId] = useState(
    localStorage.getItem("checkoutId")
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    shopifyClient.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });

    if (!checkoutId) {
      shopifyClient.checkout.create().then((checkout) => {
        setCheckoutId(checkout.id);
        localStorage.setItem("checkoutId", checkout.id);
      });
    }
  }, [checkoutId]);

  const addToCart = (variantId, quantity) => {
    if (!checkoutId) {
      Swal.fire({
        title: "Error",
        text: "Checkout session is not initialized yet!",
        icon: "error",
      });
      return;
    }

    // const customAttributes = [];
    // if (color) customAttributes.push({ key: "Color", value: color });
    // if (size) customAttributes.push({ key: "Size", value: size });

    shopifyClient.checkout
      .addLineItems(checkoutId, [
        {
          variantId,
          quantity,
          // customAttributes, // Add custom attributes here
        },
      ])
      .then((updatedCheckout) => {
        setCart(updatedCheckout); // Update cart state

        Swal.fire({
          title: "Added to Cart!",
          text: "The item has been added to your cart.",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Go to Cart",
          cancelButtonText: "Continue Shopping",
          confirmButtonColor: "#65867c",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/cart";
          }
        });
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  useEffect(() => {
    if (checkoutId) {
      shopifyClient.checkout.fetch(checkoutId).then((fetchedCart) => {
        setCart(fetchedCart);
      });
    }
  }, [checkoutId]);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
