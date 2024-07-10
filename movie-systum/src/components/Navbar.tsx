import React from "react";
import { Typography } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Menu } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { AppBar } from "@mui/material";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Navbar: React.FC = () => {
  const { isLoggedIn, currentUser } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Movie App
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {isLoggedIn ? (
                  <>
                    <MenuItem onClick={() => handleNavigate("/favorites")}>
                      Favourites
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => handleNavigate("/login")}>
                      Login
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/register")}>
                      Register
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              {isLoggedIn ? (
                <>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Welcome, {currentUser?.username}
                  </Typography>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/favorites")}
                  >
                    Favourites
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
