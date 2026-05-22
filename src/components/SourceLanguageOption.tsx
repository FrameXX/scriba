import {
  Box,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Icon } from "./Icon";
import { useState } from "react";
import { MenuTitle } from "./MenuTitle";

export type SourceLanguage = "asciidoc" | "markdown";

interface Props {
  onSelection: (value: SourceLanguage) => unknown;
  value: SourceLanguage;
}

export function SourceLanguageOption(props: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: SourceLanguage) => {
    props.onSelection(value);
    handleClose();
  };

  return (
    <Box>
      <IconButton
        id="source-language-button"
        sx={{
          borderRadius: 0,
        }}
        title="Change markup language"
        aria-haspopup="true"
        aria-controls={menuOpen ? "source-language-button" : undefined}
        aria-expanded={menuOpen ? "true" : undefined}
        onClick={handleClick}
      >
        <Icon iconId="xml" />
      </IconButton>
      <Menu
        id="source-language-button"
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
            "aria-labelledby": "source-language-button",
          },
        }}
      >
        <MenuTitle>Source markup language</MenuTitle>
        <RadioGroup value={props.value}>
          <MenuList dense>
            <MenuItem
              title="Use AsciiDoc"
              onClick={() => handleSelect("asciidoc")}
            >
              <FormControlLabel
                value="asciidoc"
                control={<Radio size="small" />}
                label="AsciiDoc"
              />
            </MenuItem>
            <MenuItem
              title="Use MarkDown"
              onClick={() => handleSelect("markdown")}
            >
              <FormControlLabel
                value="markdown"
                control={<Radio size="small" />}
                label="MarkDown"
              />
            </MenuItem>
          </MenuList>
        </RadioGroup>
      </Menu>
    </Box>
  );
}
