import { Box } from "@mui/material";
import iconSourcePath from "../assets/icons.svg?url";

interface Props {
  iconId: string;
  gutterRight?: boolean;
}

export function Icon(props: Props) {
  const href = `${iconSourcePath}#${props.iconId}`;

  return (
    <Box
      component="svg"
      sx={{
        aspectRatio: "1 / 1",
        width: 24,
        color: "primary.text",
        fill: "currentColor",
        marginRight: props.gutterRight ? 1.2 : 0,
      }}
      aria-hidden
      role="img"
    >
      <use href={href} />
    </Box>
  );
}
