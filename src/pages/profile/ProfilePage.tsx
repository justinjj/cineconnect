import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

import { useAuth } from "../../hooks/useAuth";
import { useUserProfile } from "../../hooks/useUserProfile";
import { useProfilePicture } from "../../hooks/useProfilePicture";

export default function ProfilePage() {
  const { logout } = useAuth();

  const {
    profile,
    loading: profileLoading,
  } = useUserProfile();

  const {
    imageUrl,
    loading: pictureLoading,
    upload,
  } = useProfilePicture();

  const loading = profileLoading || pictureLoading;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    await upload(file);

    // Allow selecting the same file again later.
    event.target.value = "";
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 6 }}>
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={imageUrl ?? undefined}
              alt={profile?.name ?? "Profile"}
              sx={{
                width: 120,
                height: 120,
              }}
            />

            <Typography variant="h5">
              {profile?.name}
            </Typography>

            <Typography color="text.secondary">
              {profile?.email}
            </Typography>

            <Button
              component="label"
              variant="contained"
              disabled={loading}
            >
              {pictureLoading
                ? "Uploading..."
                : "Change Picture"}

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>

            <Button
              color="error"
              onClick={logout}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}