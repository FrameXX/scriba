import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "katex/dist/katex.min.css";
import { App } from "./App";
import { ThemeProvider } from "@mui/material";
import { LayoutProvider } from "./components/LayoutProvider";
import { globalTheme } from "./modules/themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={globalTheme}>
      <LayoutProvider>
        <App />
      </LayoutProvider>
    </ThemeProvider>
  </StrictMode>,
);
