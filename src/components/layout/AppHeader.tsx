import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  Toolbar,
  Typography
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export default function AppHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          {/* Brand */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            🎬 CineConnect
          </Typography>
          {/* Navigation */}
          <Box component="nav" aria-label="Main Navigation">
            <List
              component="ul"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                m: 0,
                p: 0,
                listStyle: "none"
              }}
            >
              <ListItem component="li" disablePadding>
                <Link
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  underline="none"
                  sx={{
                    px: 1.5,
                    py: 1
                  }}
                >
                  Home
                </Link>
              </ListItem>

              {isAuthenticated ? (
                <>
                  <ListItem component="li" disablePadding>
                    <Link
                      component={RouterLink}
                      to="/profile"
                      color="inherit"
                      underline="none"
                      sx={{
                        px: 1.5,
                        py: 1
                      }}
                    >
                      Profile
                    </Link>
                  </ListItem>

                  {/* <ListItem component="li" disablePadding>
                    <IconButton
                      color="inherit"
                      onClick={() => navigate("/profile")}
                      aria-label="Open profile"
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                        }}
                      >
                        {user?.username?.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </ListItem> */}
                  <ListItem component="li" disablePadding>
                    <Link
                      component="button"
                      color="inherit"
                      underline="none"
                      onClick={handleLogout}
                      sx={{
                        px: 1.5,
                        py: 1,
                        cursor: "pointer",
                        font: "inherit",
                      }}
                    >
                      Logout
                    </Link>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem component="li" disablePadding>
                    <Link
                      component={RouterLink}
                      to="/login"
                      color="inherit"
                      underline="none"
                      sx={{
                        px: 1.5,
                        py: 1
                      }}
                    >
                      Login
                    </Link>
                  </ListItem>

                  <ListItem component="li" disablePadding>
                    <Link
                      component={RouterLink}
                      to="/signup"
                      color="inherit"
                      underline="none"
                      sx={{ px: 1.5, py: 1 }}
                    >
                      Sign Up
                    </Link>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}