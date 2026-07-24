import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ActorSearch from "../../features/actor-search/components/ActorSearch";

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          CineConnect 🎬
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Find movies where two actors appeared together.
        </Typography>

        <Stack spacing={3}>
          <ActorSearch label="Actor 1" />

          <ActorSearch label="Actor 2" />

          <Box>
            <Button variant="contained" size="large">
              Find Common Movies
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}