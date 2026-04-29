import { Box } from "@mui/material";
import { WritingArea } from "./components/WritingArea";
import { useState } from "react";
import { Preview } from "./components/Preview";
import { paperComponentMap } from "./modules/md_component_maps/paper";

export function App() {
  const [sourceCode, setSourceCode] = useState("");

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          flexGrow: 1,
          display: "flex",
          margin: 1.6,
          gap: 1.6,
        }}
      >
        <WritingArea onChange={(content) => setSourceCode(content)} />
        <Preview
          wrapContent
          sourceCode={sourceCode}
          componentMap={paperComponentMap}
        />
      </Box>
    </Box>
  );
}
