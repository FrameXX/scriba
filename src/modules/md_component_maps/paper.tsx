/** eslint-disable @typescript-eslint/no-unused-vars */

import {
  Typography,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Checkbox,
  ThemeProvider,
} from "@mui/material";
import type { ReactElement, ReactNode } from "react";
import { type Components } from "react-markdown";

type TextAlignment =
  | "center"
  | "right"
  | "left"
  | "inherit"
  | "justify"
  | undefined;

export const paperComponentMap: Components = {
  h1: ({ node, ...props }) => (
    <Typography {...props} variant="h3" component="h1" gutterBottom />
  ),
  h2: ({ node, ...props }) => (
    <Typography {...props} variant="h4" component="h2" gutterBottom />
  ),
  h3: ({ node, ...props }) => (
    <Typography {...props} variant="h5" component="h3" gutterBottom />
  ),
  h4: ({ node, ...props }) => (
    <Typography {...props} variant="h6" component="h4" gutterBottom />
  ),
  h5: ({ node, ...props }) => (
    <Typography {...props} variant="subtitle1" component="h5" />
  ),
  h6: ({ node, ...props }) => (
    <Typography {...props} variant="subtitle2" component="h6" />
  ),
  p: ({ node, ...props }) => (
    <Typography
      {...props}
      variant="body1"
      sx={{
        marginBottom: 1.6,
        "&:only-child": { margin: 0 },
        "&:has(> img)": { display: "flex", gap: 1.6, flexWrap: "wrap" },
      }}
    />
  ),
  span: ({ node, ...props }) => (
    <Box
      component="span"
      {...props}
      sx={{
        textDecoration:
          props.className === "underline" ? "underline" : undefined,
      }}
    />
  ),
  em: ({ node, ...props }) => (
    <Box {...props} component="em" sx={{ fontStyle: "italic" }} />
  ),
  strong: ({ node, ...props }) => (
    <Box {...props} component="strong" sx={{ fontWeight: "bold" }} />
  ),
  del: ({ node, ...props }) => (
    <Box {...props} component="del" sx={{ textDecoration: "line-through" }} />
  ),
  hr: () => <Divider sx={{ my: 4 }} />,
  blockquote: ({ node, ...props }) => (
    <Paper
      {...props}
      component="blockquote"
      sx={{
        borderLeft: "4px solid",
        borderColor: "primary.main",
        padding: 2,
        marginX: 0,
        bgcolor: "action.hover",
        fontStyle: "italic",
        "&:last-child": {
          marginBottom: 0,
        },
      }}
    />
  ),
  a: ({ node, ...props }) => {
    const targetIsExternal =
      !props.href?.startsWith("#") && !props.href?.startsWith("/");
    return (
      <Link
        {...props}
        target={targetIsExternal ? "_blank" : undefined}
        rel={targetIsExternal ? "noopener" : undefined}
      />
    );
  },
  img: ({ node, ...props }) => (
    <Paper
      {...props}
      onLoad={(e) => e.currentTarget.classList.add("loaded")}
      onError={(e) => e.currentTarget.classList.remove("loaded")}
      component="img"
      sx={{
        "&:not(.loaded)": {
          padding: 0.8,
        },
      }}
    />
  ),
  ul: ({ node, ...props }) => (
    <List
      {...props}
      sx={{
        listStyleType: "disc",
        paddingLeft: 4,
        paddingY: 0,
        marginBottom: 1.6,
      }}
    />
  ),
  ol: ({ node, ...props }) => (
    <List
      {...props}
      component="ol"
      sx={{
        listStyleType: "decimal",
        paddingLeft: 4,
        paddingY: 0,
        marginBottom: 1.6,
      }}
    />
  ),
  input: ({ node, ...props }) => {
    return (
      <Checkbox
        checked={props.checked}
        sx={{ pointerEvents: "none", padding: 1 }}
      />
    );
  },
  li: ({ node, ...props }) => {
    return (
      <ListItem {...props} sx={{ display: "list-item", padding: 0 }}>
        <ListItemText primary={props.children} />
      </ListItem>
    );
  },
  table: ({ node, ...props }) => (
    <TableContainer
      {...props}
      component={Paper}
      sx={{ my: 3, overflowX: "auto" }}
    >
      <Table size="small">{props.children}</Table>
    </TableContainer>
  ),
  thead: ({ node, ...props }) => (
    <TableHead {...props} sx={{ bgcolor: "action.selected" }} />
  ),
  tbody: ({ node, ...props }) => <TableBody {...props} />,
  tr: ({ node, ...props }) => (
    <TableRow
      {...props}
      sx={{ "&:nth-of-type(even)": { bgcolor: "action.hover" } }}
    />
  ),
  th: ({ node, style, ...props }) => (
    <TableCell
      {...props}
      align={(style?.textAlign as TextAlignment) || "left"}
    />
  ),
  td: ({ node, style, ...props }) => (
    <TableCell
      {...props}
      align={(style?.textAlign as TextAlignment) || "left"}
    />
  ),
  code: ({ node, className, ...props }) => {
    if (className) {
      return <code className={className} {...props} />;
    }

    return (
      <Paper
        component="code"
        elevation={0}
        sx={{
          display: "inline",
          borderRadius: 0.5,
          paddingX: 0.6,
          paddingY: 0.2,
          fontFamily: "JetBrains Mono, monospace",
          bgcolor: "action.selected",
        }}
        {...props}
      />
    );
  },
  pre: ({ node, children, ...props }) => {
    const codeElement = children as ReactElement<{
      className?: string;
      children?: ReactNode;
    }>;
    const className = codeElement?.props?.className || "";
    const match = /language-(\w+)/.exec(className);
    const language = match ? match[1] : undefined;
    const codeContent = codeElement?.props?.children;

    return (
      <Paper
        component="pre"
        sx={{
          display: "block",
          padding: 1.6,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: "0.875rem",
          fontWeight: 500,
          overflow: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
        {...props}
      >
        {language && (
          <>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: "uppercase" }}
            >
              {language}
            </Typography>
            <Divider sx={{ marginY: 1.2 }} />
          </>
        )}
        <Box component="code" sx={{ display: "block" }}>
          {codeContent}
        </Box>
      </Paper>
    );
  },
};
