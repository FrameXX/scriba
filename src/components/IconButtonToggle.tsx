import { IconButton } from "@mui/material";
import { Icon } from "./Icon";

interface Props {
  onToggle: () => unknown;
  iconId: string;
  title?: string;
  notRound?: boolean;
}

export function IconButtonToggle(props: Props) {
  return (
    <IconButton
      sx={{
        borderRadius: props.notRound ? 0 : null,
      }}
      title={props.title}
      onClick={props.onToggle}
    >
      <Icon iconId={props.iconId} />
    </IconButton>
  );
}
