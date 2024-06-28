"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';

// export const metadata = {
//   title: 'Rate My Train',
//   description: 'Submit and view train reviews',
// };

export default function Home() {

  const [session, setSession] = useState(null);

  useEffect(() => {

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      setSession(session);
      if ((event === 'SIGNED_OUT') && (window.location.pathname === '/submit-review' || window.location.pathname === '/check-reviews')) {
        window.location.href = '/';
      }
    });

  }, []);

  return (
    <div className="container mt-4">
      <main className="text-left">
        <h1 className="mb-4">Wish I Could Rate This Train Somewhere!</h1>
        <div>
          <p className="lead">Yes, I've had that exact thought. Ever boarded a train expecting a smooth ride and ended up regretting your decision? Been there, built <strong>RateMyTrain</strong> <del>to vent</del> so you can choose the rails wisely.</p>
        </div>
        <div>
          <p className="lead">It's your place to share honest reviews, helping others avoid <small><em>shitty</em></small> trains.</p>
        </div>

        <p className="lead">Join me in shaping better journeys for everyone!</p>


        {!session && (
          <p className='text-right text-danger'>
            <small>Sign In With Google to Submit or Check reviews.</small>
          </p>
        )}


      </main>
      <footer className=" fixed-bottom text-center mb-4">
        <p>Made with ❤️ by <a href="https://x.com/harshilshrma" target="_blank" rel="noopener noreferrer">Harshil ➚</a></p>
      </footer>
    </div>
  );
}
