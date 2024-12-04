import React, { createContext, useContext, useEffect, useState } from "react";
import shopifyClient from "./pages/shopifyClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Create the Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState(
    localStorage.getItem("checkoutId")
  );
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch products from Shopify
    shopifyClient.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });

    // Create checkout session
    if (!checkoutId) {
      shopifyClient.checkout.create().then((checkout) => {
        setCheckoutId(checkout.id);
        localStorage.setItem("checkoutId", checkout.id); // Store checkout ID for cart management
      });
    }
  }, []);

  const addToCart = (variantId, quantity, color, size) => {
    if (!checkoutId) {
      alert("Checkout session is not ready yet!");
      return;
    }

    shopifyClient.checkout
      .addLineItems(checkoutId, [
        {
          variantId,
          quantity: quantity,
          properties: {
            color,
            size,
          },
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

        console.log("Cart updated:", updatedCheckout);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  // Fetch cart data
  useEffect(() => {
    // if (!checkoutId) {
    //   window.href = "/shop"
    //   navigate("/shop");
    //   return;
    // }
    shopifyClient.checkout.fetch(checkoutId).then((fetchedCart) => {
      setCart(fetchedCart);
    });
  }, [checkoutId]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        setIsCartOpen,
        isCartOpen,
        addToCart,
        checkoutId,
        setCheckoutId,
        products,
        setQuantity,
        quantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the Cart Context
export const useCart = () => useContext(CartContext);
