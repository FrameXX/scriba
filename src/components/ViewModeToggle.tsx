import { Paper } from "@mui/material";
import type { ViewMode } from "./ViewModeOption";
import { IconButtonToggle } from "./IconButtonToggle";

interface Props {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => unknown;
}

export function ViewModeToggle(props: Props) {
  const handleToggle = () => {
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
        contain: "paint",
      }}
    >
      <IconButtonToggle
        title="Toggle view mode"
        notRound
        iconId={props.viewMode != "write" ? "text-box" : "pencil"}
        onToggle={handleToggle}
      />
    </Paper>
  );
}
