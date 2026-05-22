import { Box, Paper } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useDebouncedValue } from "../modules/hooks/use_debounced_value";
import { DEFAULT_SOURCE_CODE } from "../modules/default_source_code";
import useLocalStorageState from "use-local-storage-state";

interface Props {
  onChange?: (content: string) => unknown;
  wrapContent?: boolean;
  visible: boolean;
  zoom: number;
}

export interface WritingAreaRef {
  undo: () => void;
  redo: () => void;
}

export const WritingArea = forwardRef<WritingAreaRef, Props>((props, ref) => {
  const input = useRef<HTMLElement>(null);
  const [content, setContent] = useLocalStorageState("source_code", {
    defaultValue: DEFAULT_SOURCE_CODE,
  });
  const contentDebounced = useDebouncedValue(content, 1000);

  useImperativeHandle(ref, () => ({
    undo: () => {
      input.current?.focus();
      document.execCommand("undo");
    },
    redo: () => {
      input.current?.focus();
      document.execCommand("redo");
    },
  }));

  useEffect(() => {
    props.onChange?.(contentDebounced);
  }, [props, contentDebounced]);

  useEffect(() => {
    if (input.current && content) {
      input.current.innerText = content;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    setContent(e.currentTarget.innerText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const selection = window.getSelection();
      if (!selection) return;
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode("\t"));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      setContent(e.currentTarget.innerText);
    }
  };

  return (
    <Paper
      id="writing-area"
      elevation={3}
      sx={{
        display: props.visible ? null : "none",
        padding: 1.6,
        flexGrow: 1,
        width: 0,
        minWidth: props.wrapContent ? null : 0,
        overflow: "auto",
        fontFamily: "ui-monospace, 'JetBrains Mono'",
        fontWeight: 500,
      }}
    >
      <Box
        ref={input}
        contentEditable
        data-placeholder="You can write here..."
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        sx={{
          zoom: props.zoom,
          fontVariantLigatures: "none",
          outline: "none",
          whiteSpace: props.wrapContent ? "pre-wrap" : "pre",
          tabSize: 4,
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
        onInput={(e: React.InputEvent<HTMLElement>) =>
          setContent(e.currentTarget.innerText)
        }
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
      />
    </Paper>
  );
});
