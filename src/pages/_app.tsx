import type { AppProps } from "next/app";

import "@/styles/globals.scss";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />

      <Footer />
    </>
  );
}
