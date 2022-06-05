import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { getProvider } from "../utils/web3";
import { ethers } from "ethers";
import Layout from "../components/Layout";

const getLibrary = (provider: any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  colors: {
    brand: {
      /*
      --rich-black-fogra-29: #011627ff;
      --baby-powder: #fdfffcff;
      --tiffany-blue: #2ec4b6ff;
      --rose-madder: #e71d36ff;
      --orange-peel: #ff9f1cff;
      */
      100: "#011627ff",
      200: "#fdfffcff",
      300: "#2ec4b6ff",
      400: "#e71d36ff",
      500: "#ff9f1cff",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="root_container" >
        <Web3ReactProvider getLibrary={getProvider}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </Web3ReactProvider>
    </div>
  );
}

export default MyApp
