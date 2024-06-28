import './globals.css';
import Navbar from '@/components/Navbar';
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: 'Rate My Train',
  description: 'Submit and view train reviews',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Analytics />
        <script src="https://accounts.google.com/gsi/client" async></script>
      </body>
    </html>
  );
}
