import { NextResponse } from 'next/server';

export async function GET() {
  const endpoint = `https://wearandgo0.myshopify.com/api/2024-01/graphql.json`;
  const key = "2b2a24dd3b717e7a4a597de302843b32"; 

  const query = `
    query Products {
      products(first: 20) {
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
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
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
      body: JSON.stringify({ query }),
      next: { revalidate: 60 }
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify API errors:', body.errors);
      return NextResponse.json({ error: 'Shopify API Error', details: body.errors }, { status: 500 });
    }

    const formattedProducts = body?.data?.products?.edges.map((edge) => {
      const product = edge.node;
      const images = product.images?.edges || [];
      const defaultVariant = product.variants?.edges[0]?.node;
      const rawPrice = parseFloat(product.priceRange.minVariantPrice.amount);

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        rawPrice: rawPrice,
        price: `₹${rawPrice.toLocaleString('en-IN')}`,
        image: images[0]?.node?.url || '/product-gold-1.jpg',
        hoverImage: images[1]?.node?.url || images[0]?.node?.url || '/product-gold-2.jpg',
        variantId: defaultVariant?.id || null,
        availableForSale: defaultVariant?.availableForSale ?? true
      };
    }) || [];

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching from Shopify:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
