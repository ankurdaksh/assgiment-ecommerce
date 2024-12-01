import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductData } from '@/lib/constants/products';

interface ProductCardProps {
  product: ProductData;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
          {/* <Button
            onClick={() => onAddToCart(product._id)}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button> */}
        </div>
      </div>
    </div>
  );
}