import { Box, Paper } from "@mui/material";
import { ViewModeOption, type ViewMode } from "./ViewModeOption";
import { useLayout } from "../modules/hooks/use_layout";
import { ViewModeToggle } from "./ViewModeToggle";

interface Props {
  onViewModeSelect: (mode: ViewMode) => unknown;
  viewMode: ViewMode;
}

export function ControlPanel(props: Props) {
  const { isMobile } = useLayout();

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
      {props.viewMode !== "preview" && (
        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            margin: 0,
            flexShrink: 0,
          }}
        ></Paper>
      )}
      {!isMobile && <ViewModeOption onChange={props.onViewModeSelect} />}
      {props.viewMode !== "write" && (
        <Paper
          elevation={3}
          sx={{
            flexGrow: 1,
            margin: 0,
            flexShrink: 0,
          }}
        ></Paper>
      )}
      {isMobile && (
        <ViewModeToggle
          viewMode={props.viewMode}
          onChange={props.onViewModeSelect}
        />
      )}
    </Box>
  );
}
