import { Box, Paper } from "@mui/material";
import { ViewModeOption, type ViewMode } from "./ViewModeOption";

interface Props {
  onViewModeSelect: (mode: ViewMode) => unknown;
}

export function ControlPanel(props: Props) {
  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        display: "flex",
        height: 38,
        flexShrink: 0,
        gap: 1.6,
        minHeight: 0,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          margin: 0,
          flexShrink: 0,
        }}
      ></Paper>
      <ViewModeOption onChange={props.onViewModeSelect} />
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          margin: 0,
          flexShrink: 0,
        }}
      ></Paper>
    </Box>
  );
}
