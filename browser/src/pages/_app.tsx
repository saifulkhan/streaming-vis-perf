import React, { ReactElement, ReactNode, StrictMode } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { NextPage } from "next";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CacheProvider } from "@emotion/react";

import useSettings from "src/hooks/useSettings";
import { createCustomTheme } from "src/mui/theme";
import { createEmotionCache } from "src/mui/createEmotionCache";
import useScrollReset from "src/hooks/useScrollReset";
import { HelmetProvider } from "react-helmet-async";
import { SettingsProvider } from "src/contexts/SettingsContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Import all the css files created for d3 charts/
// import "src/lib/css/windmap-svg.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { settings } = useSettings();

  useScrollReset();

  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme,
  });

  const getLayout =
    Component.getLayout ??
    ((page) => {
      return page;
    });

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Performance</title>
      </Head>
      <StrictMode>
        <HelmetProvider>
          <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Toaster position="top-center" />
                  {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </StyledEngineProvider>
        </HelmetProvider>
      </StrictMode>
    </CacheProvider>
  );
}

export default MyApp;
