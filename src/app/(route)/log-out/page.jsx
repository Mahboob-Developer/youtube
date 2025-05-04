'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      {session ? (
        <>
          <span>Hello, {session.user.name}</span>
          <button onClick={() => signOut({ callbackUrl: '/sign-in' })}>
            Logout
          </button>
        </>
      ) : (
        <a href="/sign-in">Login</a>
      )}
    </nav>
  );
}
