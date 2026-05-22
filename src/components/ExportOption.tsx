import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { Icon } from "./Icon";
import { useState } from "react";
import { MenuTitle } from "./MenuTitle";

export type ViewMode = "write" | "both" | "preview";

interface Props {
  onRequestAdocExport: () => unknown;
}

export function ExportOption(props: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        id="export-button"
        title="Export"
        aria-haspopup="true"
        aria-controls={menuOpen ? "export-menu" : undefined}
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
      >
        <Icon iconId="export-variant" />
      </IconButton>
      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          list: {
            "aria-labelledby": "export-button",
          },
        }}
      >
        <MenuTitle>Export</MenuTitle>
        <MenuItem
          title="Export as PDF"
          onClick={() => {
            window.print();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Icon iconId="file-pdf-box" />
          </ListItemIcon>
          <ListItemText>PDF</ListItemText>
        </MenuItem>
        <MenuItem
          title="Export as AsciiDoc source file"
          onClick={() => {
            props.onRequestAdocExport();
            handleClose();
          }}
        >
          <ListItemIcon>
            <Icon iconId="file-code" />
          </ListItemIcon>
          <ListItemText>AsciiDoc</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
