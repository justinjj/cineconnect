"use client";

import {
  List,
  ListItem,
} from "@mui/material";
import Link from "next/link";

import { useAuth } from "../../hooks/useAuth";

export default function AuthNavigation() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

console.log("Auth state:", {
  isAuthenticated,
  user,
});

  const handleLogout = async () => {
    await logout();
  };

  return (
    <List
      component="ul"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        m: 0,
        p: 0,
        listStyle: "none",
      }}
    >
      <ListItem component="li" disablePadding>
        <Link
          href="/"
          style={{
            color: "inherit",
            textDecoration: "none",
            padding: "8px 12px",
          }}
        >
          Home
        </Link>
      </ListItem>

      {isAuthenticated ? (
        <>
          <ListItem component="li" disablePadding>
            <Link
              href="/profile"
              style={{
                color: "inherit",
                textDecoration: "none",
                padding: "8px 12px",
              }}
            >
              Profile
            </Link>
          </ListItem>

          <ListItem component="li" disablePadding>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                color: "inherit",
                background: "none",
                border: 0,
                padding: "8px 12px",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              Logout
            </button>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem component="li" disablePadding>
            <Link
              href="/login"
              style={{
                color: "inherit",
                textDecoration: "none",
                padding: "8px 12px",
              }}
            >
              Login
            </Link>
          </ListItem>

          <ListItem component="li" disablePadding>
            <Link
              href="/signup"
              style={{
                color: "inherit",
                textDecoration: "none",
                padding: "8px 12px",
              }}
            >
              Sign Up
            </Link>
          </ListItem>
        </>
      )}
    </List>
  );
}