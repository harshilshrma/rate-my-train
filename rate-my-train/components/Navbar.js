'use client'

// components/Navbar.js

import Link from 'next/link';
import { useState, useEffect } from 'react';
import GoogleSignIn from './GoogleSignIn';
import { supabase } from '../utils/supabase';

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.getSession();

        if (session) {
            setUser(session.user);
        } else {
            setUser(null);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session.user);
            } else {
                setUser(null);
            }
        });
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/" className="navbar-brand">
                Rate My Train
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    {user && (
                        <li className="nav-item">
                            <Link href="/submit-review" className="nav-link">
                                Submit Review
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto">
                        {user ? (
                            <li className="nav-item">
                                <div className="d-flex align-items-center">
                                    <img src={user.user_metadata.avatar_url} alt="User Avatar" className="mr-2 rounded-circle" style={{ width: '24px', height: '24px' }} />
                                    <span className="mr-2">Hi, {user.user_metadata.full_name}</span>
                                    <button className="btn btn-outline-danger" onClick={handleSignOut}>
                                        Sign Out
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <GoogleSignIn />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}