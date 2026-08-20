import {
  AppBar,
  Box,
  Container,
  Toolbar,
} from "@mui/material";
import Link from "next/link";

import AuthNavigation from "./AuthNavigation";

export default function AppHeader() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ px: 0 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Link
              href="/"
              style={{
                color: "inherit",
                textDecoration: "none",
                fontSize: "1.25rem",
                fontWeight: 500,
              }}
            >
              🎬 CineConnect
            </Link>
          </Box>

          <Box
            component="nav"
            aria-label="Main navigation"
          >
            <AuthNavigation />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}