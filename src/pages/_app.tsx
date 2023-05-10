import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.scss";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Head>
          <title>JustSee | Enjoy your movie</title>
          <meta name="description" content="enjoy your movie" key="desc" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </QueryClientProvider>
  );
}
