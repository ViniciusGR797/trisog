import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { ExperienceProvider } from "@/contexts/ExperienceContext";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import { QueryProvider } from "@/contexts/QueryOptionsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <FavoriteProvider>
        <ExperienceProvider>
          <QueryProvider>
            <Component {...pageProps} />
            <ToastContainer />
            <Analytics />
            <SpeedInsights />
          </QueryProvider>
        </ExperienceProvider>
      </FavoriteProvider>
    </CurrencyProvider>
  );
}
