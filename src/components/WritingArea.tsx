import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "../modules/hooks/use_debounced_value";

interface Props {
  onChange?: (content: string) => unknown;
  wrapContent?: boolean;
}

export function WritingArea(props: Props) {
  const [content, setContent] = useState("");
  const contentDebounced = useDebouncedValue(content, 400);

  useEffect(() => {
    props.onChange?.(contentDebounced);
  }, [props, contentDebounced]);

  return (
    <Paper
      elevation={4}
      sx={{
        padding: "12px",
        flexGrow: 1,
        flexBasis: 0,
        width: 0,
        minWidth: props.wrapContent ? null : 0,
        overflow: "auto",
        fontFamily: "ui-monospace, 'JetBrains Mono'",
        fontWeight: 500,
      }}
    >
      <Box
        contentEditable
        data-placeholder="You can write here..."
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        sx={{
          outline: "none",
          whiteSpace: props.wrapContent ? null : "pre",
          minWidth: "100%",
          minHeight: "100%",
          width: props.wrapContent ? null : "max-content",
          "&:empty:before": {
            content: "attr(data-placeholder)",
            color: "text.secondary",
            position: "absolute",
            pointerEvents: "none",
            opacity: 0.6,
          },
        }}
        onInput={(e) => setContent(e.currentTarget.innerText)}
      />
    </Paper>
  );
}
