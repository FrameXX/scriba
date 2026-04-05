import { Box, Paper } from "@mui/material";

export function WritingArea() {
  return (
    <Paper
      elevation={4}
      sx={{
        padding: "12px",
        margin: "12px",
        flexGrow: 1,
        display: "flex",
      }}
    >
      <Box
        contentEditable
        data-placeholder="You can write here..."
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        sx={{
          fontFamily: "ui-monospace, 'JetBrains Mono'",
          fontWeight: 500,
          flexGrow: 1,
          outline: "none",
          overflowY: "auto",
          "&:empty:before": {
            content: "attr(data-placeholder)",
            color: "text.secondary",
            position: "absolute",
            pointerEvents: "none",
            opacity: 0.6,
          },
        }}
      />
    </Paper>
  );
}
