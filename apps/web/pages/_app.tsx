import "../less/App.css";
import SiteLayout from "../components/layout/SiteLayout";
import createApolloClient from "../config/apollo-client";
import { ApolloProvider } from "@apollo/client";

export const apolloClient = createApolloClient();

export default function App({
  Component,
  pageProps,
}: AppProps<CustomPageProps>) {
  return (
    <ApolloProvider client={apolloClient}>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </ApolloProvider>
  );
}
