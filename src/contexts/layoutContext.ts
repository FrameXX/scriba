import { createContext } from "react";

interface LayoutContextValue {
  isMobile: boolean;
}

export const layoutContext = createContext<LayoutContextValue>({
  isMobile: false,
});
