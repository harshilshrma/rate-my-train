'use client'

import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

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
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/" className="nav-link">
                            Home
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/submit-review" className="nav-link">
                            Submit Review
                        </Link>
                    </li>

                    <li className="nav-item">
                        {
                            session ? (
                                <button className='nav-link btn btn-link' onClick={() => signOut()}>Sign Out</button>
                            ) : (
                                <button className='nav-link btn btn-link' onClick={() => signIn("google")}>Sign In With Google</button>
                            )
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
}
