import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = (): JSX.Element => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Sort Visualization
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
