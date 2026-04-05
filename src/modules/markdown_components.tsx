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
} from "@mui/material";
import { type Components } from "react-markdown";
import "katex/dist/katex.min.css";

type TextAlignment =
  | "center"
  | "right"
  | "left"
  | "inherit"
  | "justify"
  | undefined;

export const markdownComponents: Components = {
  h1: ({ children }) => (
    <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 3 }}>
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography variant="h6" component="h4" gutterBottom>
      {children}
    </Typography>
  ),
  h5: ({ children }) => (
    <Typography variant="subtitle1" component="h5" sx={{ fontWeight: "bold" }}>
      {children}
    </Typography>
  ),
  h6: ({ children }) => (
    <Typography
      variant="subtitle2"
      component="h6"
      sx={{ fontWeight: "bold", textTransform: "uppercase" }}
    >
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
      {children}
    </Typography>
  ),

  em: ({ children }) => (
    <Box component="em" sx={{ fontStyle: "italic" }}>
      {children}
    </Box>
  ),
  strong: ({ children }) => (
    <Box component="strong" sx={{ fontWeight: "bold" }}>
      {children}
    </Box>
  ),
  del: ({ children }) => (
    <Box component="del" sx={{ textDecoration: "line-through" }}>
      {children}
    </Box>
  ),
  hr: () => <Divider sx={{ my: 4 }} />,
  blockquote: ({ children }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: "4px solid",
        borderColor: "primary.main",
        pl: 2,
        py: 1,
        my: 2,
        bgcolor: "action.hover",
        fontStyle: "italic",
      }}
    >
      {children}
    </Box>
  ),
  a: ({ href, children }) => (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="hover"
    >
      {children}
    </Link>
  ),
  img: ({ src, alt }) => (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{ maxWidth: "100%", height: "auto", borderRadius: 1, my: 2 }}
    />
  ),
  ul: ({ children }) => (
    <List sx={{ listStyleType: "disc", pl: 4, mb: 2 }}>{children}</List>
  ),
  ol: ({ children }) => (
    <List component="ol" sx={{ listStyleType: "decimal", pl: 4, mb: 2 }}>
      {children}
    </List>
  ),
  li: (props) => {
    // Podpora pro tasklist (checkboxy)
    const children = props.children;
    const checked = (props as { checked: boolean }).checked;
    if (checked !== null && checked !== undefined) {
      return (
        <ListItem sx={{ p: 0, display: "flex", alignItems: "flex-start" }}>
          <Checkbox checked={checked} disabled size="small" />
          <ListItemText primary={children} />
        </ListItem>
      );
    }
    return (
      <ListItem sx={{ display: "list-item", p: 0, pb: 0.5 }}>
        <ListItemText primary={children} />
      </ListItem>
    );
  },
  table: ({ children }) => (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ my: 3, overflowX: "auto" }}
    >
      <Table size="small">{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }) => (
    <TableHead sx={{ bgcolor: "action.selected" }}>{children}</TableHead>
  ),
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => (
    <TableRow sx={{ "&:nth-of-type(even)": { bgcolor: "action.hover" } }}>
      {children}
    </TableRow>
  ),
  th: ({ children, style }) => (
    <TableCell
      align={(style?.textAlign as TextAlignment) || "left"}
      sx={{
        fontWeight: "bold",
        borderRight: "1px solid rgba(224, 224, 224, 1)",
      }}
    >
      {children}
    </TableCell>
  ),
  td: ({ children, style }) => (
    <TableCell
      align={(style?.textAlign as TextAlignment) || "left"}
      sx={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
    >
      {children}
    </TableCell>
  ),
  code: (props) => {
    const className = props.className;
    const children = props.children;
    const inline = (props as { inline: boolean }).inline;
    const isInline = !className && !inline;
    if (isInline) {
      return (
        <Box
          component="code"
          sx={{
            bgcolor: "grey.200",
            px: 0.7,
            py: 0.2,
            borderRadius: 1,
            fontFamily: "monospace",
            fontSize: "0.9em",
          }}
        >
          {children}
        </Box>
      );
    }
    return (
      <Box
        component="pre"
        sx={{
          bgcolor: "#2d2d2d",
          color: "#ccc",
          p: 2,
          borderRadius: 1,
          overflowX: "auto",
          fontFamily: "monospace",
        }}
      >
        <code>{children}</code>
      </Box>
    );
  },
};
