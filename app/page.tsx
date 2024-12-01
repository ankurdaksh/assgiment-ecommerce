import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-primary mb-6" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Welcome to E-Store
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of premium products. Shop with confidence and enjoy a seamless shopping experience.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/products">
            <Button size="lg">
              Start Shopping
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" size="lg">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}