'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { verifyEmail } = useAuth();
  const token = searchParams.get('token');

  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          await verifyEmail(token);
          router.push('/'); 
        } catch (error) {
          console.error('Verification failed:', error);
          router.push('/login'); 
        }
      }
    };

    verify();
  }, [token, verifyEmail, router]);

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
        <p className="text-muted-foreground">Please wait while we verify your email address.</p>
      </div>
    </div>
  );
}