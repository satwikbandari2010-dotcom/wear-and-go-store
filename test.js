async function testNewStore() {
  const query = `query { products(first: 10) { edges { node { id title handle } } } }`;
  const res = await fetch('https://wearandgo0.myshopify.com/api/2024-01/graphql.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '2b2a24dd3b717e7a4a597de302843b32'
    },
    body: JSON.stringify({ query })
  });
  const data = await res.json();
  console.log('New store data:', JSON.stringify(data, null, 2));
}
testNewStore();
