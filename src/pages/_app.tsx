import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssBaseline>
      <Component {...pageProps} />
    </CssBaseline>
  );
}

export default MyApp;
