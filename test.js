const query = `query { products(first: 10) { edges { node { title } } } }`;
fetch('https://wear-and-go-4icc9vpe.myshopify.com/api/2024-01/graphql.json', { 
  method: 'POST', 
  headers: { 
    'Content-Type': 'application/json', 
    'X-Shopify-Storefront-Access-Token': '2a19af34c1a096a1b944959bcf660050' 
  }, 
  body: JSON.stringify({ query }) 
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)));
