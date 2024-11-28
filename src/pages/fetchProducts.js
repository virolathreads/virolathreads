import client from "./shopifyClient";

const fetchProducts = async () => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    return data.products.edges.map(({ node }) => node);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default fetchProducts;
