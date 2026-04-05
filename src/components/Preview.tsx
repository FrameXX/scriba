import "katex/dist/katex.min.css";
import { Paper, Box } from "@mui/material";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkSuperSub from "remark-supersub";
import rehypeRaw from "rehype-raw";

interface Props {
  content: string;
  componentMap: Components;
  wrapContent?: boolean;
}

export function Preview(props: Props) {
  return (
    <Paper
      elevation={4}
      sx={{
        flexGrow: 1,
        flexBasis: 0,
        padding: 1.6,
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
          remarkPlugins={[remarkGfm, remarkSuperSub, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          remarkRehypeOptions={{
            footnoteLabel: " ",
            footnoteLabelTagName: "hr",
          }}
          components={props.componentMap}
        >
          {props.content}
        </ReactMarkdown>
      </Box>
    </Paper>
  );
}
