import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Icon } from "./Icon";
import { useState } from "react";
import { useLayout } from "../modules/hooks/use_layout";

export type ViewMode = "write" | "both" | "preview";

interface Props {
  onChange: (mode: ViewMode) => unknown;
}

export function ViewModeOption(props: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const { isMobile } = useLayout();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModeSelect = (mode: ViewMode) => {
    handleClose();
    props.onChange(mode);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: 0,
        aspectRatio: "1 / 1",
        flexShrink: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <IconButton
          title="Change view mode"
          aria-haspopup="true"
          aria-controls={menuOpen ? "view-menu" : undefined}
          aria-expanded={menuOpen ? "true" : undefined}
          onClick={handleClick}
        >
          <Icon iconId="view-dashboard" />
        </IconButton>
        <Menu
          id="view-menu"
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
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem title="Write" onClick={() => handleModeSelect("write")}>
            <Icon gutterRight iconId="pencil" />
            <Typography variant="inherit">Write</Typography>
          </MenuItem>
          {!isMobile && (
            <MenuItem title="Both" onClick={() => handleModeSelect("both")}>
              <Icon gutterRight iconId="text-box-edit" />
              <Typography variant="inherit">Both</Typography>
            </MenuItem>
          )}
          <MenuItem title="Preview" onClick={() => handleModeSelect("preview")}>
            <Icon gutterRight iconId="text-box" />
            <Typography variant="inherit">Preview</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
}
