import Layout from "@/layouts/Layout";
import React, { useEffect, useState } from "react";
import shopifyClient from "./shopifyClient";
import { useNavigate } from "react-router-dom";
import { Delete } from "lucide-react";
import { useCart } from "@/CartContext";

export default function Cart() {
  const navigate = useNavigate();

  const { cart, setCart, checkoutId } = useCart();
  // Fetch cart data

  // Function to update the quantity
  const updateCartQuantity = (lineItemId, quantity) => {
    shopifyClient.checkout
      .updateLineItems(checkoutId, [
        {
          id: lineItemId,
          quantity: quantity,
        },
      ])
      .then((updatedCart) => {
        setCart(updatedCart);
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  };

  // Increment and Decrement functions
  const incrementQuantity = (lineItemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateCartQuantity(lineItemId, newQuantity);
  };

  const decrementQuantity = (lineItemId, currentQuantity) => {
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    updateCartQuantity(lineItemId, newQuantity);
  };

  // Remove item from cart
  const removeItemFromCart = (lineItemId) => {
    shopifyClient.checkout
      .removeLineItems(checkoutId, [lineItemId])
      .then((updatedCart) => {
        setCart(updatedCart);
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  console.log(cart);

  return (
    <Layout>
      <section className="bg-white py-8 antialiased">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 text-left p-5">
            Your Cart
          </h1>
          {cart && cart.lineItems.length ? (
            <>
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <table className="w-full table-auto border-collapse tables">
                  <thead className="theads">
                    <tr className="bg-gray-100 text-left tr">
                      <th
                        className="px-6 py-4 text-2xl font-medium text-gray-500 th"
                        data-label="S/N"
                      >
                        S/N
                      </th>
                      <th
                        className="px-6 py-4 text-2xl font-medium text-gray-500 th"
                        data-label="Product"
                      >
                        Product
                      </th>
                      <th
                        className="px-6 py-4 text-2xl font-medium text-gray-500 th"
                        data-label="Quantity"
                      >
                        Quantity
                      </th>
                      <th
                        className="px-6 py-4 text-2xl font-medium text-gray-500 th"
                        data-label="Total"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.lineItems.map((item, i) => (
                      <tr key={item.id} className="border-t tr">
                        {/* Product Details */}
                        <td className="px-6 py-4">
                          <div className="flex items-center">{i + 1}</div>
                        </td>
                        <td className="px-6 py-4 td">
                          <div className="flex items-center space-x-4">
                            <img
                              className="h-20 w-20 rounded-md object-cover"
                              src={item.variant.image?.src}
                              alt={item.title}
                            />
                            <div>
                              <h3 className="text-2xl font-medium text-gray-800">
                                {item.title}
                              </h3>
                              <p className="text-2xl text-gray-500">
                                Color:{" "}
                                {item.variant.selectedOptions.find(
                                  (opt) => opt.name === "Color"
                                )?.value || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Quantity Adjustment */}
                        <td className="px-6 py-4 ">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                decrementQuantity(item.id, item.quantity)
                              }
                              className="px-2 py-1 border border-gray-300 rounded-md"
                            >
                              -
                            </button>
                            <span className="mx-3 text-2xl">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                incrementQuantity(item.id, item.quantity)
                              }
                              className="px-2 py-1 border border-gray-300 rounded-md"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeItemFromCart(item.id)}
                              className="ml-4 text-red-500 hover:text-red-700 text-2xl"
                            >
                              <Delete />
                            </button>
                          </div>
                        </td>

                        {/* Total Price */}
                        <td className="px-6 py-4">
                          <span className="text-2xl font-medium text-gray-800">
                            {item.variant.price.currencyCode}{" "}
                            {item.variant.price.amount}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Summary */}
              <div className="mt-8 bg-gray-100 p-6 rounded-md shadow-md">
                <h1 className="text-4xl font-bold text-gray-800 text-left p-5">
                  Order Summary
                </h1>
                <div className="mt-4 space-y-2">
                  {/* Iterate through cart items */}
                  {cart?.lineItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-2xl text-gray-600  text-left">
                        {item.title.toUpperCase()}
                        {/* Variant descriptions */}
                        <>
                          {item.variant.selectedOptions.map((option) => (
                            <p className="text-lg text-gray-600">
                              {`${option.name}: ${option.value}`}
                            </p>
                          ))}
                        </>

                        {/* Quantity */}
                        <p className="text-lg text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </span>
                      <span className="text-2xl text-gray-800">
                        {item.variant.price.currencyCode}{" "}
                        {item.variant.price.amount}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between">
                  <span className="text-3xl font-medium text-gray-800">
                    Total:
                  </span>
                  <span className="text-3xl font-semibold text-gray-900">
                    {cart?.currencyCode} {cart?.totalPrice?.amount}
                  </span>
                </div>
                <button
                  className=" mt-6 btn py-4 rounded-md text-2xl font-medium hover:bg-blue-700"
                  onClick={() => (window.location.href = cart?.webUrl)}
                >
                  Checkout
                </button>
              </div>
            </>
          ) : (
            // Empty Cart Message
            <>
              {!cart?.lineItems.length && (
                <div className=" text-3xl text-center text-gray-500 space-y-96">
                  <p>Your cart is empty.</p>
                  <a
                    href="/shop"
                    className="mt-6 btn py-4 rounded-md text-2xl font-medium hover:bg-blue-700"
                  >
                    Continue Shopping
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
