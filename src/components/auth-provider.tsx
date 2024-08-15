import React, { createContext, useContext, useState, useEffect } from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import db from '@/lib/db';

interface User {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture?: string | null;
}

interface AuthContextType {
  user?: User;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ loading: true });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { getUser } = getKindeServerSession();
      const kindeUser = await getUser();

      if (kindeUser && kindeUser.id) {
        const existingUser = await db.user.findUnique({
          where: { id: kindeUser.id },
        });

        if (!existingUser) {
          await db.user.create({
            data: {
              id: kindeUser.id,
              email: kindeUser.email!,
              firstName: kindeUser.given_name ?? '',
              lastName: kindeUser.family_name ?? '',
              image: kindeUser.picture ?? null,
              connectedAccountId: 'email:otp',
            },
          });
        }

        const user: User = {
          id: kindeUser.id,
          email: kindeUser.email ?? null,
          given_name: kindeUser.given_name ?? null,
          family_name: kindeUser.family_name ?? null,
          picture: kindeUser.picture ?? null,
        };

        setUser(user);
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
