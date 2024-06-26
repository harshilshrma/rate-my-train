'use client'

// components/Navbar.js

import Link from 'next/link';

export default function Navbar() {
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
                    <li className="nav-item">
                        <Link href="/submit-review" className="nav-link">
                            Submit Review
                        </Link>
                    </li>
                </ul>
                <div className="my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link href="/signup" className="btn btn-outline-success mx-2">
                                Sign Up
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/signin" className="btn btn-outline-primary mx-2">
                                Sign In
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
