import { AuthUserData } from './../../../../types/index';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';
import { poster } from '@/lib/fetch';

interface userData {
  username: string;
  key: string;
  id: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(userData: AuthUserData | undefined) {
        try {
          if (!userData) {
            return null;
          }

          const { username, password, cartData } = userData;

          const authRes = await poster(
            '/wp-json/jwt-auth/v1/token',
            { username, password },
            'POST',
          );
          const authJson = await authRes.json();

          if (authJson && authJson.token) {
            const userId: any = jwt.decode(authJson.token);
            const userUrl = `/wp-json/wc/v3/customers/${userId.data.user.id}`;

            if (cartData) {
              const cart = JSON.parse(cartData);
              if (cart.items.length > 0) {
                await poster(
                  userUrl,
                  { meta_data: [{ key: 'cart', value: cart.key }] },
                  'PUT',
                );
              }
            }

            const user: userData = {
              username: authJson.user_display_name,
              key: authJson.token,
              id: userId.data.user.id,
            };
            return user;
          } else {
            console.log(authJson);
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    verifyRequest: '/login/check-email',
    error: '/login/error',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
  },
};
