import React, { useContext, useState } from "react";
import { useAuth } from "../../hooks";

import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Hidden,
  Button,
  Link,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";

import { sideBarLinks } from "./ui-data";
import { FormattedMessage } from "react-intl";
import { Context } from './../../providers/context/context';
import { ACTIONS } from "../../providers/context/constants";
import { saveToStorage } from './../../utils/sessionStorage';

const Navigation = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const {dispatch} = useContext(Context)
  const { isAuth, username } = useAuth()


  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };
  const logOut = () => {
    dispatch({type:ACTIONS.REMOVE_USER})
    saveToStorage('username',null)
    saveToStorage('email',null)
    saveToStorage('token',null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary" enableColorOnDark>
        <Toolbar>
          {isAuth ? (
            <Hidden only={["lg", "xl"]}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          ) : null}
          <Link
            component={RouterLink}
            to="/"
            sx={{
              color: "white",
              textDecoration: "none",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <MovieCreationIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movies
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", lg: "flex" } }}>
            {isAuth ? (
              <>
                <Button
                  component={RouterLink}
                  to="/"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <FormattedMessage id="navigations.home" />
                </Button>
                <Button
                  component={RouterLink}
                  to="/recommends"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <FormattedMessage id="navigations.recommends" />
                </Button>
                <Button
                  component={RouterLink}
                  to="/settings"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <FormattedMessage id="navigations.settings" />
                </Button>
              </>
            ) : null}
          </Box>
          {isAuth ? (
            <>
            <Button
              component={RouterLink}
              to={`/profile/${username}`}
              color="inherit"
            >
              <FormattedMessage id="navigations.myProfile" />
            </Button>
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              onClick={logOut}
            >
              <FormattedMessage id="navigations.logOut" />
            </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                <FormattedMessage id="navigations.login" />
              </Button>
              <Button component={RouterLink} to="/register" color="inherit">
                <FormattedMessage id="navigations.signUp" />
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {sideBarLinks.map((link, index) => (
              <Link
                component={RouterLink}
                to={link.path}
                sx={{ textDecoration: "none", color: "#616161" }}
                onClick={toggleDrawer}
                key={`${link}_${index}`}
              >
                <ListItem key={`${link}_${index}`} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navigation;
