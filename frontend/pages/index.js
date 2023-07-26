import { CoinMarketProvider } from "../context/context";
import { useEffect } from "react";
import Header from "./components/section-components/Header";
import CoinTable from "./components/section-components/CoinTable";
import Hero from "./components/section-components/Hero";
import { ThemeProvider } from "@material-tailwind/react";
import Compare from "./Compare";
import Footer from "./components/section-components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./src/pages/forms/LoginForm";
import UserCoinTable from "./src/components/table/UserCoinTable";
import UserDisplayAdTable from "./src/components/table/UserDisplayAdTable";
import Banner from "./src/components/Banner";

const isBrowser = typeof window !== "undefined";

export default function Home() {
  useEffect(() => {
    if (
      localStorage.theme === "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Whenever the user explicitly chooses light mode
    localStorage.theme = "light";

    // Whenever the user explicitly chooses dark mode
    localStorage.theme = "dark";

    // Whenever the user explicitly chooses to respect the OS preference
    localStorage.removeItem("theme");
  });

  return (
    <>
      <ThemeProvider>
        <CoinMarketProvider>
          <div id="page" className="bg-body">
            <Header />
            <Banner />
            <Hero />

            <CoinTable />
            <Compare />
            <UserCoinTable />

            <Footer />
          </div>
        </CoinMarketProvider>
      </ThemeProvider>
    </>
  );
}
