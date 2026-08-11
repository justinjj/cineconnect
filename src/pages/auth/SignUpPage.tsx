import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { confirmUserSignUp, registerUser } from "../../services/auth/authService";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirmationRequired, setIsConfirmationRequired] = useState(false);

  const navigate = useNavigate();

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

      if (result.isSignUpComplete) {
        setIsConfirmed(true);
      }
    } catch(error) {
      console.error("Confirmation failed", error)
    }
  }

  if (isConfirmed) {
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
            textAlign: "center",
          }}
        >
          <Stack 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3, // MUI theme spacing unit, same as spacing={3}
            }}
          >
            <Typography variant="h3">
              🎉
            </Typography>

            <Typography variant="h4">
              Email Verified!
            </Typography>

            <Typography color="text.secondary">
              Your CineConnect account has been
              successfully created and verified.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
            >
              Continue to Login
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }  

  if (isConfirmationRequired) {
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
          </Paper>
        </Container>

    )
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
        <Stack spacing={3}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center" }}
          >
            Create Account
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Join CineConnect and keep track of your
            favourite comparisons.
          </Typography>

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            fullWidth
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSignUp}
            disabled={!email || !password}
          >
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}