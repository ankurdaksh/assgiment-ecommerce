'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Store, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const initialState = {
    access: typeof window !== "undefined" ? window.localStorage.getItem('authToken') : false,
};
 
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
          <div className="flex items-center gap-2 font-semibold">
          <Store className="h-6 w-6" />
          <span>E-Store</span>
          </div>
        
        <div className="ml-auto flex items-center space-x-4">
          {initialState.access ? (
            <>
              <Link href="/products">
                <Button variant="ghost">Products</Button>
              </Link>
            
                {/* <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button> */}
              {/* <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </Link> */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            !initialState.access && (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}