import { Box } from "@mui/material";
import { WritingArea } from "./components/WritingArea";
import { useState } from "react";
import { Preview } from "./components/Preview";
import { paperComponentMap } from "./modules/component_maps/paper";
import { ControlPanel } from "./components/ControlPanel";
import type { ViewMode } from "./components/ViewModeOption";
import { useLayout } from "./modules/hooks/use_layout";
import { exportAdoc } from "./modules/export_adoc";

export function App() {
  const [sourceCode, setSourceCode] = useState("");
  const [selectedViewMode, setSelectedViewMode] = useState<ViewMode>("both");
  const { isMobile } = useLayout();

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
            visible={viewMode != "preview"}
            onChange={(content) => setSourceCode(content)}
          />
          <Preview
            visible={viewMode != "write"}
            wrapContent
            sourceCode={sourceCode}
            componentMap={paperComponentMap}
          />
        </Box>
        <ControlPanel
          viewMode={viewMode}
          onViewModeSelect={setSelectedViewMode}
          onRequestAdocExport={() => exportAdoc("document.adoc", sourceCode)}
        />
      </Box>
    </Box>
  );
}
