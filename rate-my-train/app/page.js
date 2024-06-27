"use client"

import Link from 'next/link';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';

// export const metadata = {
//   title: 'Rate My Train',
//   description: 'Submit and view train reviews',
// };

export default function Home() {

  useEffect(() => {
    const sessionListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      if ((event === 'SIGNED_OUT') && window.location.pathname === '/submit-review') {
        window.location.href = '/';
      }
    });
  }, []);

  return (
    <div>
      <main>
        <h1>Welcome to Rate My Train</h1>
        <p>This is a simple placeholder for now. More features coming soon!</p>
      </main>
    </div>
  );
}
