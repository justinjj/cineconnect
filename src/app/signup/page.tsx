"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { register } from "../../services/auth/authService";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await register(name, email, password);

      router.push(`/confirm-signup?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Signup failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSignup}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4">
          Create Account
        </Typography>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </Box>
    </Container>
  );
}