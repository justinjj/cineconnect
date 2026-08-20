"use client";

import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import {
  confirmRegistration,
  resendConfirmationCode,
} from "../../services/auth/authService";

export default function ConfirmSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      await confirmRegistration(email, code);

      router.push("/login");
    } catch (error) {
      console.error("Confirmation failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to confirm your account"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setMessage(null);

    try {
      await resendConfirmationCode(email);

      setMessage(
        "A new confirmation code has been sent."
      );
    } catch (error) {
      console.error("Resend code failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to resend confirmation code"
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleConfirm}
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h4">
          Confirm Your Account
        </Typography>

        <Typography>
          Enter the confirmation code sent to:
        </Typography>

        <Typography 
          sx={{
            fontWeight: "bold"
          }}>
          {email}
        </Typography>

        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        {message && (
          <Alert severity="success">
            {message}
          </Alert>
        )}

        <TextField
          label="Confirmation Code"
          value={code}
          onChange={(event) =>
            setCode(event.target.value)
          }
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? "Confirming..."
            : "Confirm Account"}
        </Button>

        <Button
          type="button"
          variant="text"
          onClick={handleResendCode}
        >
          Resend Code
        </Button>
      </Box>
    </Container>
  );
}