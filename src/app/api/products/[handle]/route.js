import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { handle } = await params;
  const endpoint = `https://wear-and-go-4icc9vpe.myshopify.com/api/2024-01/graphql.json`;
  const key = "2a19af34c1a096a1b944959bcf660050";

  const query = `
    query ProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
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
      body: JSON.stringify({ query, variables: { handle } }),
      next: { revalidate: 60 }
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify API errors:', body.errors);
      return NextResponse.json({ error: 'Shopify API Error', details: body.errors }, { status: 500 });
    }

    const product = body?.data?.product;
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const images = product.images?.edges.map(e => e.node.url) || [];
    const rawPrice = parseFloat(product.priceRange.minVariantPrice.amount);
    const variants = product.variants?.edges.map(e => ({
      id: e.node.id,
      title: e.node.title,
      availableForSale: e.node.availableForSale,
      rawPrice: parseFloat(e.node.price.amount),
      price: `₹${parseFloat(e.node.price.amount).toLocaleString('en-IN')}`,
      selectedOptions: e.node.selectedOptions || []
    })) || [];

    const formattedProduct = {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      rawPrice: rawPrice,
      price: `₹${rawPrice.toLocaleString('en-IN')}`,
      images: images.length > 0 ? images : ['/product-gold-1.jpg'],
      options: product.options?.filter(o => o.name !== 'Title') || [],
      variants: variants,
      defaultVariantId: variants[0]?.id || null,
      availableForSale: variants.some(v => v.availableForSale)
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
