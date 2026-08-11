import { useState } from "react";
import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getAuthenticatedUser, getCurrentAuthSession, loginUser } from "../../services/auth/authService";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await loginUser(email, password);

      console.log("Login result:", result);

      if (result.isSignedIn) {
        navigate("/");
      }

    } catch(error) {
      console.error("Login failed:", error);
    }
  }

  return (
      <Container maxWidth="sm">
        <Paper
          elevation={2}
          sx={{
            p: {
              xs: 3,
              sm: 5,
            },
            mt: {
              xs: 4,
              md: 10,
            },
          }}
        >
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
          </Stack>
        </Paper>
      </Container>

  )

}
