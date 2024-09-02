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
import { SearchProvider } from "@/contexts/SearchContext";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <FavoriteProvider>
        <ExperienceProvider>
          <SearchProvider>
            <QueryProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Component {...pageProps} />
                <ToastContainer />
                <Analytics />
                <SpeedInsights />
              </LocalizationProvider>
            </QueryProvider>
          </SearchProvider>
        </ExperienceProvider>
      </FavoriteProvider>
    </CurrencyProvider>
  );
}
