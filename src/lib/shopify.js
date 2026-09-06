export async function shopifyFetch({ query, variables = {} }) {
  const endpoint = `https://wear-and-go-4icc9vpe.myshopify.com/api/2024-01/graphql.json`;
  const key = "2a19af34c1a096a1b944959bcf660050"; // Public Storefront API token

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: JSON.stringify({ query, variables })
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}

export async function getProducts() {
  const query = `
    query Products {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  
  // Format the products so they match our exact frontend format
  const formattedProducts = response.body?.data?.products?.edges.map((edge) => {
    const product = edge.node;
    const images = product.images.edges;
    return {
      id: product.id,
      title: product.title,
      price: `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`,
      image: images[0]?.node?.url || '/product-gold-1.jpg',
      hoverImage: images[1]?.node?.url || images[0]?.node?.url || '/product-gold-2.jpg',
    };
  }) || [];

  return formattedProducts;
}
