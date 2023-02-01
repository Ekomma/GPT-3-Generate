import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useApollo } from "../lib/apolloClient";
import '../../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Test App</title>
        <meta name="description" content="A Test Application" />
        <link rel="icon" href="/favicon2.ico" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
        <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
