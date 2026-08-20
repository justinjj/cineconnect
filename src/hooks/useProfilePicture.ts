"use client";

import { useEffect, useState } from "react";

import {
  getProfilePictureUrl,
  uploadProfilePicture,
} from "@/services/storage/profileStorage";

export function useProfilePicture() {
  const [imageUrl, setImageUrl] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPicture() {
      try {
        const url = await getProfilePictureUrl();

        if (!cancelled) {
          setImageUrl(url);
        }
      } catch (error) {
        console.error(
          "Failed to load profile picture:",
          error
        );

        if (!cancelled) {
          setImageUrl(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPicture();

    return () => {
      cancelled = true;
    };
  }, []);

  const upload = async (file: File) => {
    setLoading(true);

    try {
      await uploadProfilePicture(file);

      const url = await getProfilePictureUrl();

      setImageUrl(url);
    } catch (error) {
      console.error(
        "Failed to upload profile picture:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    imageUrl,
    loading,
    upload,
  };
}