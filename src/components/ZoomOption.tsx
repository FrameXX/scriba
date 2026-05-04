import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Icon } from "./Icon";
import { useState } from "react";
import { MenuTitle } from "./MenuTitle";

export type ViewMode = "write" | "both" | "preview";

interface Props {
  title: string;
  idPrefix: string;
  onChooseAction: (option: ZoomAction) => unknown;
}

export type ZoomAction = "zoom_in" | "zoom_out" | "reset";

export function ZoomOption(props: Props) {
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
        id={`${props.idPrefix}-zoom-button`}
        title={props.title}
        aria-haspopup="true"
        aria-controls={menuOpen ? `${props.idPrefix}-zoom-menu` : undefined}
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
      >
        <Icon iconId="magnify" />
      </IconButton>
      <Menu
        id={`${props.idPrefix}-zoom-menu`}
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
            "aria-labelledby": `${props.idPrefix}-export-button`,
          },
        }}
      >
        <MenuTitle>Change zoom</MenuTitle>
        <MenuItem
          title="Zoom in"
          onClick={() => props.onChooseAction("zoom_in")}
        >
          <Icon gutterRight iconId="magnify-plus-outline" />
          <Typography variant="inherit">Zoom in</Typography>
        </MenuItem>
        <MenuItem
          title="Zoom out"
          onClick={() => props.onChooseAction("zoom_out")}
        >
          <Icon gutterRight iconId="magnify-minus-outline" />
          <Typography variant="inherit">Zoom out</Typography>
        </MenuItem>
        <MenuItem
          title="Reset zoom"
          onClick={() => props.onChooseAction("reset")}
        >
          <Icon gutterRight iconId="magnify-remove-outline" />
          <Typography variant="inherit">Reset zoom</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
