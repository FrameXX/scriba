import { Box } from "@mui/material";
import { WritingArea, type WritingAreaRef } from "./components/WritingArea";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Preview } from "./components/Preview";
import { paperComponentMap } from "./modules/component_maps/paper";
import { ControlPanel } from "./components/ControlPanel";
import type { ViewMode } from "./components/ViewModeOption";
import { useLayout } from "./modules/hooks/use_layout";
import { exportAdoc } from "./modules/export_adoc";
import useLocalStorageState from "use-local-storage-state";
import type { ZoomAction } from "./components/ZoomOption";
import type { SourceLanguage } from "./components/SourceLanguageOption";
import { AsciiDocProcessor } from "./modules/processor/asciidoc";
import { MarkDownProcessor } from "./modules/processor/markdown";
import type { Processor } from "./modules/processor";

const SPLASHSCREEN_TRANSITION_TIME_MS = 200;
const LOAD_DELAY_MS = 200;

const processorMap: Record<SourceLanguage, Processor> = {
  asciidoc: new AsciiDocProcessor(),
  markdown: new MarkDownProcessor(),
} as const;

export function App() {
  const { isMobile } = useLayout();
  const [sourceCode, setSourceCode] = useState("");
  const [selectedViewMode, setSelectedViewMode] = useState<ViewMode>("both");
  const [sourceLanguage, setSourceLanguage] =
    useLocalStorageState<SourceLanguage>("processor", {
      defaultValue: "asciidoc",
    });
  const writingAreaRef = useRef<WritingAreaRef>(null);
  const [wrapPreview, setWrapPreview] = useLocalStorageState("wrap_preview", {
    defaultValue: true,
  });
  const [wrapWriteArea, setWrapWriteArea] = useLocalStorageState(
    "wrap_write_area",
    {
      defaultValue: false,
    },
  );
  const [writingAreaZoom, setWritingAreaZoom] = useLocalStorageState(
    "writing_area_zoom",
    { defaultValue: 1 },
  );
  const [previewZoom, setPreviewZoom] = useLocalStorageState(
    "set_preview_zoom",
    { defaultValue: 1 },
  );

  const processor = useMemo(
    () => processorMap[sourceLanguage],
    [sourceLanguage],
  );

  const viewMode =
    isMobile && selectedViewMode === "both" ? "write" : selectedViewMode;

  const handleZoomAction = (
    action: ZoomAction,
    setter: Dispatch<SetStateAction<number>>,
  ) => {
    if (action == "zoom_in") {
      setter((zoom) => Math.min(zoom + 0.05, 3));
    } else if (action == "zoom_out") {
      setter((zoom) => Math.max(zoom - 0.05, 0.1));
    } else {
      setter(1);
    }
  };

  useEffect(() => {
    const splashscreen = document.getElementById("splashscreen");
    if (splashscreen) {
      setTimeout(() => {
        splashscreen.style.opacity = "0";
        setTimeout(() => {
          splashscreen.style.display = "none";
        }, SPLASHSCREEN_TRANSITION_TIME_MS);
      }, LOAD_DELAY_MS);
    }
  }, []);

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
            ref={writingAreaRef}
            zoom={writingAreaZoom}
            wrapContent={wrapWriteArea}
            visible={viewMode != "preview"}
            onChange={(content) => setSourceCode(content)}
          />
          <Preview
            processor={processor}
            zoom={previewZoom}
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
          onViewModeSelection={setSelectedViewMode}
          writingAreaZoom={writingAreaZoom}
          previewZoom={previewZoom}
          onPreviewZoomAction={(action) =>
            handleZoomAction(action, setPreviewZoom)
          }
          onWritingAreaZoomAction={(action) =>
            handleZoomAction(action, setWritingAreaZoom)
          }
          onRequestAdocExport={() => exportAdoc("document.adoc", sourceCode)}
          onToggleWrapPreview={() => setWrapPreview((value) => !value)}
          onToggleWrapWriteArea={() => setWrapWriteArea((value) => !value)}
          onSourceLanguageSelection={(language) => setSourceLanguage(language)}
          sourceLanguage={sourceLanguage}
          onUndo={() => writingAreaRef.current?.undo()}
          onRedo={() => writingAreaRef.current?.redo()}
        />
      </Box>
    </Box>
  );
}
