import Layout from "@/layouts/Layout";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import shopifyClient from "./shopifyClient";
import { useNavigate } from "react-router-dom";
import { Delete } from "lucide-react";
import { useCart } from "@/CartContext";
import PreLoader from "@/lib/PreLoader";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    setCart,
    checkoutId,
    setLoad,
    load,
    currency,
    handleAmountChange,
  } = useCart();

  // Fetch cart data
  useEffect(() => {
    setLoad(true);
    shopifyClient.checkout.fetch(checkoutId).then((fetchedCart) => {
      console.log(fetchedCart);
      setCart(fetchedCart);
      setLoad(false);
    });
  }, [checkoutId]);

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

  if (load) {
    return <PreLoader />;
  }

  return (
    <Layout>
      <section className="bg-white py-8 antialiased">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl font-bold text-gray-800 text-left p-5">
            Your Cart
          </h1>
          {cart && cart.lineItems.length ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <table className="w-full table-auto border-collapse tables">
                  <thead className="theads ">
                    <tr className=" text-left tr">
                      <th className="px-6 py-4 text-2xl font-medium text-white bg-[#65867c] th">
                        S/N
                      </th>
                      <th className="px-6 py-4 text-2xl font-medium text-white  bg-[#65867c] th">
                        Product
                      </th>
                      <th className="px-6 py-4 text-2xl font-medium text-white bg-[#65867c] th">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-2xl font-medium text-white bg-[#65867c] th">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <motion.tbody layout>
                    {cart?.lineItems.map((item, i) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border-t tr"
                      >
                        <td className="px-6 py-4">{i + 1}</td>
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
                                )?.value || ""}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4">
                          <span className="text-2xl font-medium text-gray-800">
                            {currency}{" "}
                            {handleAmountChange(item.variant.price.amount)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </table>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8 bg-gray-100 p-6 rounded-md shadow-md"
              >
                <h1 className="text-4xl font-bold text-gray-800 text-left p-5">
                  Order Summary
                </h1>
                <div className="mt-4 space-y-2">
                  {cart?.lineItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-2xl text-gray-600">
                        {item.title.toUpperCase() || "Product Name Unavailable"}
                        {item.variant?.selectedOptions ? (
                          <>
                            {item.variant.selectedOptions.map(
                              (option, index) => (
                                <p
                                  key={index}
                                  className="text-lg text-gray-600"
                                >
                                  {`${option.name}: ${option.value}`}
                                </p>
                              )
                            )}
                          </>
                        ) : (
                          <p className="text-lg text-gray-400 italic">
                            Details unavailable
                          </p>
                        )}{" "}
                        {/* Quantity */}
                        <p className="text-lg text-gray-600">
                          Quantity: {item.quantity || "N/A"}
                        </p>
                      </span>
                      <span className="text-2xl text-gray-800">
                        {currency || "N/A"}{" "}
                        {handleAmountChange(
                          (item.variant?.price?.amount || 0) *
                            (item.quantity || 0)
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between">
                  <span className="text-3xl font-medium text-gray-800">
                    Total:
                  </span>
                  <span className="text-3xl font-semibold text-gray-900">
                    {currency || "N/A"}{" "}
                    {handleAmountChange(cart?.totalPrice?.amount || 0)}
                  </span>
                </div>
                <button
                  className=" mt-6 btn py-4 rounded-md text-2xl font-medium hover:bg-blue-700"
                  onClick={() => {
                    window.location.href = cart?.webUrl || "/";
                    localStorage.setItem("checkoutId", "");
                  }}
                >
                  Checkout
                </button>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl text-center text-gray-500"
            >
              <p>Your cart is empty.</p>
              <a
                href="/shop"
                className="mt-6 btn py-4 rounded-md text-2xl font-medium hover:bg-blue-700"
              >
                Continue Shopping
              </a>
            </motion.div>
          )}
        </motion.div>
      </section>
    </Layout>
  );
}
