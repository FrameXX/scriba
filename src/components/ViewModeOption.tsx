import {
  Box,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Icon } from "./Icon";
import { useState } from "react";
import { useLayout } from "../modules/hooks/use_layout";
import { MenuTitle } from "./MenuTitle";

export type ViewMode = "write" | "both" | "preview";

interface Props {
  onChange: (mode: ViewMode) => unknown;
  value: ViewMode;
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
        contain: "paint",
      }}
    >
      <Box>
        <IconButton
          id="view-mode-button"
          sx={{
            borderRadius: 0,
          }}
          title="Change view mode"
          aria-haspopup="true"
          aria-controls={menuOpen ? "view-mode-menu" : undefined}
          aria-expanded={menuOpen ? "true" : undefined}
          onClick={handleClick}
        >
          <Icon iconId="unfold-less-vertical" />
        </IconButton>
        <Menu
          id="view-mode-menu"
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
              "aria-labelledby": "view-mode-button",
            },
          }}
        >
          <MenuTitle>View Mode</MenuTitle>
          <RadioGroup value={props.value}>
            <MenuList dense>
              <MenuItem
                title="Use writing view mode"
                onClick={() => handleModeSelect("write")}
              >
                <FormControlLabel
                  value="write"
                  control={<Radio size="small" />}
                  label="Write"
                />
              </MenuItem>
              {!isMobile && (
                <MenuItem
                  title="Use writing and preview mode"
                  onClick={() => handleModeSelect("both")}
                >
                  <FormControlLabel
                    value="both"
                    control={<Radio size="small" />}
                    label="Both"
                  />
                </MenuItem>
              )}
              <MenuItem
                title="Use preview mode"
                onClick={() => handleModeSelect("preview")}
              >
                <FormControlLabel
                  value="preview"
                  control={<Radio size="small" />}
                  label="Preview"
                />
              </MenuItem>
            </MenuList>
          </RadioGroup>
        </Menu>
      </Box>
    </Paper>
  );
}
