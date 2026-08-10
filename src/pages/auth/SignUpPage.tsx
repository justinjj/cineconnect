import { useState } from "react";
import { Button, Stack, TextField, Typography } from '@mui/material';
import { confirmUserSignUp, registerUser } from "../../services/auth/authService";

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmationRequired, setIsConfirmationRequired] = useState(false);

  const handleSignUp = async () => {
    try {
        const result = await registerUser(email, password);

        console.log("Sign up result:", result);

        if (
          result.nextStep.signUpStep === "CONFIRM_SIGN_UP"
        ) {
          setIsConfirmationRequired(true);
        }
    } catch(error) {
      console.error("Sign up failed:", error);
    }
  }

  const handleConfirmSignUp = async () => {
    try {
      const result = await confirmUserSignUp(
        email,
        confirmationCode
      );

      console.log("Confirmation result:", result);
    } catch(error) {
      console.error("Confirmation failed", error)
    }
  }

  if (isConfirmationRequired) {
    return (
      <Stack spacing={2}>
        <Typography variant="h4">
          Verify your email
        </Typography>

        <Typography color="text.secondary">
          Enter the verification code sent to your email.
        </Typography>

        <TextField
          label="Verification Code"
          value={confirmationCode}
          onChange={(event) => setConfirmationCode(event.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleConfirmSignUp}
          disabled={!confirmationCode}>
          Verify Email
        </Button>
      </Stack>
    )
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">
        Create Account
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
        onClick={handleSignUp}
        >
          Sign Up
      </Button>
    </Stack>
  )
}