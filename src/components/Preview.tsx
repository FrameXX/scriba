import { Paper, Box, ThemeProvider } from "@mui/material";
import { type Components } from "react-markdown";
import rehypeKatex from "rehype-katex";
import { unified } from "unified";
import { useMemo, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import createAsciidctor from "@asciidoctor/core";
import { rehypeStemBlock } from "../modules/rehype_stem_block";
import { rehypeInlineStem } from "../modules/rehype_inline_stem";
import { globalTheme, lightTheme } from "../modules/themes";

interface Props {
  sourceCode: string;
  componentMap: Components;
  wrapContent?: boolean;
  visible: boolean;
}

const asciidoctor = createAsciidctor();
const baseProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeStemBlock)
  .use(rehypeInlineStem)
  .use(rehypeKatex)
  .freeze();

export function Preview(props: Props) {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => {
      flushSync(() => setIsPrinting(true));
    };
    const handleAfterPrint = () => {
      flushSync(() => setIsPrinting(false));
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

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
    <ThemeProvider theme={isPrinting ? lightTheme : globalTheme}>
      <Paper
        id="preview-content"
        elevation={3}
        sx={{
          display: props.visible ? null : "none",
          flexGrow: 1,
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
    </ThemeProvider>
  );
}
