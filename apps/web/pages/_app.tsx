import '../less/App.css';
import type { AppProps as NextAppProps } from "next/app";
import SiteLayout from '../components/layout/SiteLayout';

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = any> = {
    pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

// use the new type like so, replacing 'CustomPageProps' with whatever you want
export default function App({
    Component,
    pageProps,
}: AppProps<CustomPageProps>) {
    return (
        <SiteLayout>
            <Component {...pageProps} />
        </SiteLayout>

    )
}