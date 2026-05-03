import { useMemo } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { layoutContext } from "../contexts/layoutContext";

interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const value = useMemo(() => ({ isMobile }), [isMobile]);

  return (
    <layoutContext.Provider value={value}>{children}</layoutContext.Provider>
  );
};
