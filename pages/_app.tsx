import { AppProps } from "next/app";
import { useEffect } from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
// makes it easier to work with paypal inside react
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
// react notification liberary
import { SnackbarProvider } from "notistack";
import { StoreProvider } from "../components/Store";
import Theme from "../components/Theme";
import "../styles/globals.scss";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// later we'll modify this to its own file
// const theme = createTheme();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

interface PayPalScriptProviderOptions extends ReactPayPalScriptOptions {
  clientId: any;
  currency: any;
  intent: string;
}

const initialOptions: PayPalScriptProviderOptions = {
  clientId: process.env.PAYPAL_CLIENT_ID,
  currency: process.env.PAYPAL_CURRENCY,
  intent: "capture",
};

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  useEffect(() => {
    // jssStyles are used to prevent the FOUC where a web page appears briefly with the browser's default styles prior to loading an external stylesheet and since Next.js is rendered in the server side jssStyles is not required and hence you remove it
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true} options={initialOptions}>
          <CacheProvider value={emotionCache}>
            <Theme>
              <Component {...pageProps} />
            </Theme>
          </CacheProvider>
        </PayPalScriptProvider>
      </StoreProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
