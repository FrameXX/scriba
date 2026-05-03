import { useContext } from "react";
import { layoutContext } from "../../contexts/layoutContext";

export const useLayout = () => {
  const context = useContext(layoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
