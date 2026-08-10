import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

import { getAuthenticatedUser, getCurrentAuthSession, loginUser, logoutUser } from "../../services/auth/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const result = await loginUser(email, password);

      console.log("Login result:", result);

      if (result.isSignedIn) {
        const user = await getAuthenticatedUser();
        const session = await getCurrentAuthSession();

        console.log("Current user:", user);
        console.log("Auth session:", session);
      }
    } catch(error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">
        Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={!email || !password}
        >
        Login
      </Button>

      <Button
        variant="outlined"
        onClick={ async () => {
          try {
            await logoutUser();
            console.log("Logged out successfully");
          } catch (error) {
            console.error("Logout failed", error);
          }
        }}
        >
        LogOut
      </Button>

    </Stack>
  )

}
