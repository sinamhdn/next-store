import { useMemo, useContext } from "react";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Store } from "./Store";

export const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function Theme({ children }: { children: ReactNode }) {
  const { state } = useContext(Store);
  const { darkMode } = state;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#556cd6",
          },
          secondary: {
            main: "#19857b",
          },
          error: {
            main: red.A400,
          },
        },
        typography: {
          fontFamily: inter.style.fontFamily,
          h1: {
            fontSize: "1.6rem",
            fontWeight: 400,
            margin: "1rem 0",
          },
          h2: {
            fontSize: "1.4rem",
            fontWeight: 400,
            margin: "1rem 0",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
