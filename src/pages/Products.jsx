import React, { useEffect, useState } from "react";
import shopifyClient from "./shopifyClient";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [checkoutId, setCheckoutId] = useState(null);
  const [cart, setCart, currency, handleAmountChange] = useState(null);

  useEffect(() => {
    // Fetch products from Shopify
    shopifyClient.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });

    // Create checkout session
    shopifyClient.checkout.create().then((checkout) => {
      setCheckoutId(checkout.id); // Store checkout ID for cart management
    });
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
          quantity: 1,
        },
      ])
      .then((updatedCheckout) => {
        setCart(updatedCheckout); // Update cart state
        alert("Item added to cart!");
        console.log("Cart updated:", updatedCheckout);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const fetchCartDetails = () => {
    if (!checkoutId) {
      alert("Checkout session is not ready yet!");
      return;
    }

    shopifyClient.checkout.fetch(checkoutId).then((fetchedCart) => {
      setCart(fetchedCart);
      console.log("Cart details:", fetchedCart);
    });
  };

  return (
    <div className="shop-area">
      <h1>Shop</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.images[0]?.src} alt={product.title} />
            <h2>{product.title}</h2>
            <p>
              {product.variants[0]?.price.amount}{" "}
              {product.variants[0]?.price.currencyCode}
            </p>
            <button onClick={() => addToCart(product?.variants[0].id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button onClick={fetchCartDetails} className="view-cart-btn">
        View Cart Details
      </button>
      {cart && (
        <div className="cart-details">
          <h2>Cart</h2>
          {cart.lineItems.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>
                Quantity: {item.quantity} | Price: {item.variant.price.amount}{" "}
                {/* {item.variant.price.currencyCode } */}
                {currency}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
