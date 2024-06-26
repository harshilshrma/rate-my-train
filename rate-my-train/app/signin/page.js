// pages/signin.js

"use client"

import { useState } from 'react';
import { supabase } from '../supabase.js';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { user, error } = await supabase.auth.signIn({
                email,
                password,
            });

            if (error) {
                console.error('Sign in error:', error.message);
                // Handle error state or display error message to user
            } else {
                console.log('Sign in success:', user);
                // Optionally, redirect to a new page or update user interface
            }
        } catch (error) {
            console.error('Sign in error:', error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign In
                </button>
            </form>
        </div>
    );
}
