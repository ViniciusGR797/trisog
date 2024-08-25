import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <Component {...pageProps} />
      <ToastContainer />
      <Analytics />
      <SpeedInsights />
    </CurrencyProvider>
  );
}
