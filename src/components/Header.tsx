import {
  AppBar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";

export const Header = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sort Visualization
        </Typography>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          onClick={() => setOpen(true)}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Toolbar>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>サイトについて</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ソート中の様子を見ることができます。
          </DialogContentText>
          <DialogContentText>
            見かけの走査時間と実際の走査時間は異なります。
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};
