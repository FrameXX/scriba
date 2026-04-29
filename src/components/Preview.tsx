import { Paper, Box } from "@mui/material";
import { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import { unified } from "unified";
import { useMemo } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import createAsciidctor from "@asciidoctor/core";
import { rehypeStemBlock } from "../modules/rehype_stem_block";
import { rehypeInlineStem } from "../modules/rehype_inline_stem";

interface Props {
  sourceCode: string;
  componentMap: Components;
  wrapContent?: boolean;
}

const asciidoctor = createAsciidctor();
const baseProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeStemBlock)
  .use(rehypeInlineStem)
  .use(rehypeKatex)
  .freeze();

export function Preview(props: Props) {
  const content = useMemo(() => {
    const html = asciidoctor.convert(props.sourceCode, {
      safe: "safe",
      attributes: { showtitle: true, stem: "latexmath" },
    });

    return baseProcessor()
      .use(rehypeReact, {
        jsx,
        jsxs,
        Fragment,
        components: props.componentMap,
      })
      .processSync(html).result;
  }, [props.sourceCode, props.componentMap]);

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
        {content}
      </Box>
    </Paper>
  );
}
