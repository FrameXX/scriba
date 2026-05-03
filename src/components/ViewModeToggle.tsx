import { IconButton, Paper } from "@mui/material";
import { Icon } from "./Icon";
import type { ViewMode } from "./ViewModeOption";

interface Props {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => unknown;
}

export function ViewModeToggle(props: Props) {
  const handleClick = () => {
    if (props.viewMode != "write") {
      props.onChange("write");
    } else {
      props.onChange("preview");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: 0,
        aspectRatio: "1 / 1",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton title="Toggle view mode" onClick={handleClick}>
        <Icon iconId={props.viewMode != "write" ? "text-box" : "pencil"} />
      </IconButton>
    </Paper>
  );
}
