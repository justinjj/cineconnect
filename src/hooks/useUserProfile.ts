import { useEffect, useState } from "react";

import { getCurrentUserAttributes } from "../services/auth/authService";

import {
  getOrCreateMyProfile,
} from "../services/api/userApi";

type UserProfile = {
  id: string;
  name?: string | null;
  email?: string | null;
  owner?: string | null;
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const attributes = await getCurrentUserAttributes();

        const result = await getOrCreateMyProfile(
          attributes.name ?? "",
          attributes.email ?? ""
        );

        if (!cancelled) {
          setProfile(result);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Failed to load user profile:",
            error
          );

          setProfile(null);
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    profile,
    loading,
  };
}