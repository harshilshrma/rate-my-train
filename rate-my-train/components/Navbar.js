import Link from 'next/link';

export default function Navbar() {
    return (
        <nav>
            <h2>Rate My Train</h2>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/submit-review">Submit Review</Link></li>
            </ul>
        </nav>
    );
}
