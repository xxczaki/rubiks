import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import createEmotionCache from '../utils/createEmotionCache';
import theme from '../utils/theme';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProperties extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(properties: MyAppProperties) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = properties;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </CacheProvider>
  );
}
