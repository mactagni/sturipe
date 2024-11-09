import { type AppType } from "next/dist/shared/lib/utils";
import { createContext, useState } from 'react';
import Layout from '../components/layout';
import "~/styles/globals.css";

export const PageToggleContext = createContext(false);

const MyApp: AppType = ({ Component, pageProps }) => {
  const [displayTransactions, setDisplayTransactions] = useState(false);

  return (
    <PageToggleContext.Provider value={displayTransactions}>
      <Layout setDisplayTransactions={setDisplayTransactions}>
        <Component {...pageProps} />
      </Layout>
    </PageToggleContext.Provider>
  )
};

export default MyApp;
