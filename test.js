async function testCart() {
  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      lines: [
        {
          merchandiseId: "gid://shopify/ProductVariant/48387646324994",
          quantity: 1
        }
      ]
    }
  };

  const res = await fetch('https://wear-and-go-4icc9vpe.myshopify.com/api/2024-01/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '2a19af34c1a096a1b944959bcf660050'
    },
    body: JSON.stringify({ query, variables })
  });

  const data = await res.json();
  console.log('Cart create result:', JSON.stringify(data, null, 2));
}
testCart();
