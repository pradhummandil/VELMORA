'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-white p-4">
      <div className="text-center" style={{ maxWidth: '600px' }}>
        <h2 className="font-garamond mb-20 text-dark">Something went wrong</h2>
        <p className="fs-18 mb-35 text-secondary">
          We encountered an unexpected error while loading this page. Please try refreshing or return to the homepage.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button onClick={() => reset()} className="btn-two sm">
            Try Again
          </button>
          <Link href="/" className="btn-nine sm">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
