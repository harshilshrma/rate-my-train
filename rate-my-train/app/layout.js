import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Rate My Train',
  description: 'Submit and view train reviews',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

