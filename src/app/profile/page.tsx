"use client";

import { useRef } from "react";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import { useUserProfile } from "@/hooks/useUserProfile";
import { useProfilePicture } from "@/hooks/useProfilePicture";

export default function ProfilePage() {
  const { profile, loading: profileLoading } =
    useUserProfile();

  const {
    imageUrl,
    loading: pictureLoading,
    upload,
  } = useProfilePicture();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      alert("Profile picture must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    try {
      await upload(file);
    } catch {
      alert("Failed to upload profile picture.");
    } finally {
      // Allow selecting the same file again.
      event.target.value = "";
    }
  };

  if (profileLoading) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 6 }}>
          <Typography color="error">
            Unable to load your profile.
          </Typography>
        </Box>
      </Container>
    );
  }

  const initial =
    profile.name?.charAt(0).toUpperCase() ?? "?";

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 6,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Avatar
          src={imageUrl ?? undefined}
          alt={profile.name ?? "Profile"}
          sx={{
            width: 120,
            height: 120,
            mx: "auto",
            mb: 2,
            fontSize: 48,
          }}
        >
          {!imageUrl && initial}
        </Avatar>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

        <Button
          variant="outlined"
          onClick={() => fileInputRef.current?.click()}
          disabled={pictureLoading}
        >
          {pictureLoading
            ? "Uploading..."
            : "Change Profile Picture"}
        </Button>

        <Typography
          variant="h5"
          sx={{ mt: 3, fontWeight: 600 }}
        >
          {profile.name}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {profile.email}
        </Typography>
      </Paper>
    </Container>
  );
}