import { Box, Paper } from "@mui/material";
import { WritingArea } from "./components/WritingArea";
import { useState } from "react";
import { Preview } from "./components/Preview";
import { paperComponentMap } from "./modules/component_maps/paper";
import { ControlPanel } from "./components/ControlPanel";
import type { ViewMode } from "./components/ViewModeOption";
import { useLayout } from "./modules/hooks/use_layout";
import { exportAdoc } from "./modules/export_adoc";
import useLocalStorageState from "use-local-storage-state";

export function App() {
  const { isMobile } = useLayout();
  const [sourceCode, setSourceCode] = useState("");
  const [selectedViewMode, setSelectedViewMode] = useState<ViewMode>("both");
  const [wrapPreview, setWrapPreview] = useLocalStorageState("wrap_preview", {
    defaultValue: true,
  });
  const [wrapWriteArea, setWrapWriteArea] = useLocalStorageState(
    "wrap_write_area",
    {
      defaultValue: false,
    },
  );

  const viewMode =
    isMobile && selectedViewMode === "both" ? "write" : selectedViewMode;

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          margin: 1.6,
          gap: 1.6,
        }}
      >
        <Box
          component="main"
          sx={{
            display: "flex",
            gap: 1.6,
            flexGrow: 1,
            minHeight: 0,
          }}
        >
          <WritingArea
            wrapContent={wrapWriteArea}
            visible={viewMode != "preview"}
            onChange={(content) => setSourceCode(content)}
          />
          <Preview
            wrapContent={wrapPreview}
            visible={viewMode != "write"}
            sourceCode={sourceCode}
            componentMap={paperComponentMap}
          />
        </Box>
        <ControlPanel
          viewMode={viewMode}
          wrapPreview={wrapPreview}
          wrapWriteArea={wrapWriteArea}
          onViewModeSelect={setSelectedViewMode}
          onRequestAdocExport={() => exportAdoc("document.adoc", sourceCode)}
          onToggleWrapPreview={() => setWrapPreview((value) => !value)}
          onToggleWrapWriteArea={() => setWrapWriteArea((value) => !value)}
        />
      </Box>
    </Box>
  );
}
