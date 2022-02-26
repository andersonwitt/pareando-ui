import { AppBar as MuiAppBar, Toolbar } from "@mui/material";
import "./index.css";

export const AppBar = () => {
  return (
    <MuiAppBar className="app-bar" data-testid="app-bar">
      <Toolbar data-testid="nav-toolbar">
        <p>Pareando App</p>
      </Toolbar>
    </MuiAppBar>
  );
};
