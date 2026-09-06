import { NextResponse } from 'next/server';

export async function GET() {
  const endpoint = `https://wear-and-go-4icc9vpe.myshopify.com/api/2024-01/graphql.json`;
  const key = "2a19af34c1a096a1b944959bcf660050"; 

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

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: JSON.stringify({ query })
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify API errors:', body.errors);
      return NextResponse.json({ error: 'Shopify API Error', details: body.errors }, { status: 500 });
    }

    const formattedProducts = body?.data?.products?.edges.map((edge) => {
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

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
