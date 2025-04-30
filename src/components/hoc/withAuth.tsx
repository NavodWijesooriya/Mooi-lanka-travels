'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' in App Router
import { getSession } from 'next-auth/react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const session = await getSession();
        if (!session) {
          router.push('/auth/login');
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
