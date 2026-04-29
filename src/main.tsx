import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "katex/dist/katex.min.css";
import { App } from "./App";
import { createTheme, ThemeProvider } from "@mui/material";

const globalTheme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={globalTheme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
