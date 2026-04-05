import { Paper, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { markdownComponents } from "../modules/markdown_components";

interface Props {
  content: string;
  wrapContent?: boolean;
}

export function Preview(props: Props) {
  return (
    <Paper
      elevation={4}
      sx={{
        flexGrow: 1,
        flexBasis: 0,
        padding: "12px",
        overflow: "auto",
        width: 0,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          minWidth: "100%",
          minHeight: "100%",
          width: props.wrapContent ? null : "max-content",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={markdownComponents}
        >
          {props.content}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
}
