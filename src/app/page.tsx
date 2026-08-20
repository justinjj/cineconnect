import { Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h3">
        Welcome to CineConnect
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Discover connections between movies and actors.
      </Typography>
    </Container>
  );
}