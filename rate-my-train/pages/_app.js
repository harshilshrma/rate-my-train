import { SessionProvider } from "next-auth/react"
import Navbar from "../components/Navbar"

export default function App({ Component, pageProps }) {
    return (
        <SessionProvider session={session}>
            <Navbar />
            <Component {...pageProps} />
        </SessionProvider>
    );
}