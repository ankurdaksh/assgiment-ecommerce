'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductData } from '@/lib/constants/products';
import { toast } from 'sonner';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    // TODO: Implement cart functionality
    toast.success('Added to cart');
  };

  if (loading) return null; // Next.js will show the loading.tsx component

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}