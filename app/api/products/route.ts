import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/services/product.service';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await createProduct(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}