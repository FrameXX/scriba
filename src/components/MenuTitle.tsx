import { Typography } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function MenuTitle(props: Props) {
  return (
    <Typography
      variant="overline"
      sx={{
        paddingX: 2,
        display: "block",
        color: "text.secondary",
        fontWeight: "bold",
        userSelect: "none",
      }}
    >
      {props.children}
    </Typography>
  );
}
