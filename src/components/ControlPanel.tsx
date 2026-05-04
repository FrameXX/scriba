import { Box, Paper } from "@mui/material";
import { ViewModeOption, type ViewMode } from "./ViewModeOption";
import { useLayout } from "../modules/hooks/use_layout";
import { ViewModeToggle } from "./ViewModeToggle";
import { ExportOption } from "./ExportOption";
import { IconButtonToggle } from "./IconButtonToggle";

interface Props {
  onViewModeSelect: (mode: ViewMode) => unknown;
  viewMode: ViewMode;
  wrapPreview: boolean;
  wrapWriteArea: boolean;
  onRequestAdocExport: () => unknown;
  onToggleWrapPreview: () => unknown;
  onToggleWrapWriteArea: () => unknown;
}

export function ControlPanel(props: Props) {
  const { isMobile } = useLayout();

  return (
    <Box
      id="control-panel"
      sx={{
        margin: 0,
        padding: 0,
        display: "flex",
        height: 40,
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
        >
          <IconButtonToggle
            title=""
            onToggle={props.onToggleWrapWriteArea}
            iconId={props.wrapWriteArea ? "wrap" : "wrap-disabled"}
          />
        </Paper>
      )}
      {!isMobile && <ViewModeOption onChange={props.onViewModeSelect} />}
      {props.viewMode !== "write" && (
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            flexGrow: 1,
            margin: 0,
            flexShrink: 0,
          }}
        >
          <ExportOption onRequestAdocExport={props.onRequestAdocExport} />
          <IconButtonToggle
            title=""
            onToggle={props.onToggleWrapPreview}
            iconId={props.wrapPreview ? "wrap" : "wrap-disabled"}
          />
        </Paper>
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
