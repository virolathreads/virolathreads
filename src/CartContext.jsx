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

  const addToCart = (variantId) => {
    if (!checkoutId) {
      alert("Checkout session is not ready yet!");
      return;
    }

    shopifyClient.checkout
      .addLineItems(checkoutId, [
        {
          variantId,
          quantity: quantity,
        },
      ])
      .then((updatedCheckout) => {
        setCart(updatedCheckout); // Update cart state
        // console.log(cart);

        Swal.fire({
          title: "Added to Cart!",
          text: "The item has been added to your cart.",
          icon: "success",
          showCancelButton: true, // Adds a second button
          confirmButtonText: "Go to Cart", // Button for navigating to the cart
          cancelButtonText: "Continue Shopping", // Button for staying on the page
          confirmButtonColor: "#65867c", // Custom color for the 'Go to Cart' button
          cancelButtonColor: "#d33", // Custom color for the 'Continue Shopping' button
        }).then((result) => {
          if (result.isConfirmed) {
            // Action for "Go to Cart" button
            window.location.href = "/cart"; // Replace with your cart page URL
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Action for "Continue Shopping" button
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
