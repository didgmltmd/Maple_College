import {
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";


export default function Header() {

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Maple Ranking System
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
