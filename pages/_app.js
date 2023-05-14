import NavbarComponent from "@app/src/components/navbar.component";
import "@app/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <main className="app-main relative">
        <NavbarComponent logo="/assets/logo.png" />
        <div className="">
          <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
}
