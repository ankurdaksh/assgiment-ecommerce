import { NextResponse } from 'next/server';
import { initialProducts } from '@/lib/constants/products';
import { seedProducts } from '@/lib/services/product.service';

export async function POST() {
  try {
    const products = await seedProducts(initialProducts);
    return NextResponse.json({ 
      message: 'Database seeded successfully',
      count: products.length 
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}