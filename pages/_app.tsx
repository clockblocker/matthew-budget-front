import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { TransactionsProvider } from '../app/providers/transactionsProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const themes = {
    light: {
      foreground: '#000000',
          background: '#eeeeee',
    },
    dark: {
      foreground: '#ffffff',
      background: '#222222',
    },
  };

  const TransactionsContext = createContext(themes.light);

  return (
    <TransactionsProvider>
      <Component {...pageProps} />
    </TransactionsProvider>
  );
}

export default MyApp;
