import { Box, IconButton, Paper } from "@mui/material";
import { ViewModeOption, type ViewMode } from "./ViewModeOption";
import { useLayout } from "../modules/hooks/use_layout";
import { ViewModeToggle } from "./ViewModeToggle";
import { ExportOption } from "./ExportOption";
import { IconButtonToggle } from "./IconButtonToggle";
import { ZoomOption, type ZoomAction } from "./ZoomOption";
import { Icon } from "./Icon";
import { useState } from "react";
import {
  SourceLanguageOption,
  type SourceLanguage,
} from "./SourceLanguageOption";

interface Props {
  onViewModeSelection: (mode: ViewMode) => unknown;
  onSourceLanguageSelection: (language: SourceLanguage) => unknown;
  sourceLanguage: SourceLanguage;
  viewMode: ViewMode;
  wrapPreview: boolean;
  wrapWriteArea: boolean;
  onPreviewZoomAction: (action: ZoomAction) => unknown;
  previewZoom: number;
  onWritingAreaZoomAction: (action: ZoomAction) => unknown;
  writingAreaZoom: number;
  onRequestAdocExport: () => unknown;
  onToggleWrapPreview: () => unknown;
  onToggleWrapWriteArea: () => unknown;
  onUndo: () => unknown;
  onRedo: () => unknown;
}

function runtimeSupportsExec() {
  return !(
    typeof window === "undefined" ||
    typeof document.execCommand !== "function" ||
    typeof document.queryCommandSupported !== "function"
  );
}

export function ControlPanel(props: Props) {
  const { isMobile } = useLayout();

  const [isUndoSupported] = useState(() => {
    if (!runtimeSupportsExec()) return false;
    return document.queryCommandSupported("undo");
  });
  const [isRedoSupported] = useState(() => {
    if (!runtimeSupportsExec()) return false;
    return document.queryCommandSupported("redo");
  });

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
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            flex: 1,
            margin: 0,
            flexShrink: 0,
          }}
        >
          <IconButtonToggle
            title={
              props.wrapWriteArea
                ? "Disable wraping in write area"
                : "Enable wraping in write area"
            }
            onToggle={props.onToggleWrapWriteArea}
            iconId={props.wrapWriteArea ? "wrap" : "wrap-disabled"}
          />
          <ZoomOption
            title="Change writing area zoom level"
            idPrefix="writing-area"
            onChooseAction={props.onWritingAreaZoomAction}
            value={props.writingAreaZoom}
          />
          <SourceLanguageOption
            value={props.sourceLanguage}
            onSelection={props.onSourceLanguageSelection}
          />
          {isUndoSupported && (
            <IconButton title="Undo" onClick={props.onUndo}>
              <Icon iconId="undo" />
            </IconButton>
          )}
          {isRedoSupported && (
            <IconButton title="Redo" onClick={props.onRedo}>
              <Icon iconId="redo" />
            </IconButton>
          )}
        </Paper>
      )}
      {!isMobile && (
        <ViewModeOption
          value={props.viewMode}
          onChange={props.onViewModeSelection}
        />
      )}
      {props.viewMode !== "write" && (
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            flex: 1,
            margin: 0,
            flexShrink: 0,
          }}
        >
          <IconButtonToggle
            title={
              props.wrapPreview
                ? "Disable wraping in preview"
                : "Enable wraping in preview"
            }
            onToggle={props.onToggleWrapPreview}
            iconId={props.wrapPreview ? "wrap" : "wrap-disabled"}
          />
          <ZoomOption
            title="Change preview zoom level"
            idPrefix="preview"
            onChooseAction={props.onPreviewZoomAction}
            value={props.previewZoom}
          />
          <ExportOption onRequestAdocExport={props.onRequestAdocExport} />
        </Paper>
      )}
      {isMobile && (
        <ViewModeToggle
          viewMode={props.viewMode}
          onChange={props.onViewModeSelection}
        />
      )}
    </Box>
  );
}
