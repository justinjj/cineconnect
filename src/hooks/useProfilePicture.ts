import { useEffect, useState } from "react";

import {
  getProfilePictureUrl,
  uploadProfilePicture,
} from "../services/storage/profileStorage";

export function useProfilePicture() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const url = await getProfilePictureUrl();

        if (!cancelled) {
          setImageUrl(url);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Failed to load profile picture:",
            error
          );

          setImageUrl(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const upload = async (file: File) => {
    try {
      setLoading(true);

      await uploadProfilePicture(file);

      const url = await getProfilePictureUrl();

      setImageUrl(url);
    } catch (error) {
      console.error(
        "Failed to upload profile picture:",
        error
      );
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