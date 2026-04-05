import { Box } from "@mui/material";
import { WritingArea } from "./components/WritingArea";
import { useState } from "react";
import { Preview } from "./components/Preview";

export function App() {
  const [writtenContent, setWrittenContent] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        gap: "12px",
        margin: "12px",
      }}
    >
      <WritingArea
        wrapContent
        onChange={(content) => setWrittenContent(content)}
      />
      <Preview wrapContent content={writtenContent} />
    </Box>
  );
}
