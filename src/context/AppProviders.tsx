// providers/AppProviders.tsx
import { AuthProvider } from '@/context/AuthContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  );
}
