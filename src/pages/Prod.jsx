import React, { useEffect, useState } from "react";
import shopifyClient from "./shopifyClient";
import axios from "axios";

export default function Prod() {
  const [products, setProducts] = useState();

  async function fetchAllProducts() {
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
                      }
                    }
                  }
                }
              `,
            variables: { first: 50, cursor },
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token":
                "7d25e50b36cb469b6fc5b89398f6ceb7",
            },
          }
        );

        console.log("Axios Response:", response.data);

        const products =
          response.data?.data?.products?.edges?.map((edge) => edge.node) || [];
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

  // Usage Example
  useEffect(() => {
    fetchAllProducts()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  console.log(products, "Fetched products");
  return <div>Untitled-2</div>;
}
