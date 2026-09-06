import { NextResponse } from 'next/server';

export async function POST(request) {
  const endpoint = `https://wear-and-go-4icc9vpe.myshopify.com/api/2024-01/graphql.json`;
  const key = "2a19af34c1a096a1b944959bcf660050";

  try {
    const { lines } = await request.json();

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

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
        lines: lines.map(item => ({
          merchandiseId: item.merchandiseId,
          quantity: parseInt(item.quantity, 10) || 1
        }))
      }
    };

    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: JSON.stringify({ query, variables })
    });

    const body = await result.json();

    if (body.errors || body.data?.cartCreate?.userErrors?.length > 0) {
      console.error('Cart create error:', body.errors || body.data?.cartCreate?.userErrors);
      return NextResponse.json({ 
        error: 'Failed to create checkout session', 
        details: body.errors || body.data?.cartCreate?.userErrors 
      }, { status: 500 });
    }

    const checkoutUrl = body.data.cartCreate.cart.checkoutUrl;
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: 'Internal server error during checkout' }, { status: 500 });
  }
}
