import Client from "shopify-buy";

const shopifyClient = Client.buildClient({
  domain: "91hjvt-c0.myshopify.com/", // Replace with your actual Shopify store domain
  storefrontAccessToken: "7d25e50b36cb469b6fc5b89398f6ceb7", // Replace with your actual token
  apiVersion: "2023-04", // Use a supported API version
});

export default shopifyClient;
