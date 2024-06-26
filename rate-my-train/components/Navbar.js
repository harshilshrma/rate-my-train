'use client'

import Link from 'next/link';

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/" className="navbar-brand">
                Rate My Train
            </Link>
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
                </ul>
            </div>
        </nav>
    );
}
