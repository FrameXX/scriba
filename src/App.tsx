import { Box } from "@mui/material";
import { WritingArea } from "./components/WritingArea";
import { useState } from "react";
import { Preview } from "./components/Preview";
import { markdownComponents } from "./modules/md_component_maps/paper";

export function App() {
  const [writtenContent, setWrittenContent] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        gap: 1.6,
        margin: 1.6,
      }}
    >
      <WritingArea
        wrapContent
        onChange={(content) => setWrittenContent(content)}
      />
      <Preview
        wrapContent
        content={writtenContent}
        componentMap={markdownComponents}
      />
    </Box>
  );
}
