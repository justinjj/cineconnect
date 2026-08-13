import { useEffect, useState } from "react";

import { getOrCreateMyProfile } from "../services/api/userApi";
import { getCurrentUserAttributes } from "../services/auth/authService";

type UserProfile = {
  id: string;
  name?: string | null;
  email?: string | null;
  owner?: string | null;
};

export function useUserProfile(
  isAuthenticated: boolean,
) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let cancelled = false;

    const loadProfile = async () => {
      try {
        setLoading(true);

        const attributes = 
          await getCurrentUserAttributes();

        const result = await getOrCreateMyProfile(
          attributes.name ?? "",
          attributes.email ?? ""
        );

        if (!cancelled) {
          setProfile(result);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Failed to load user profile:",
            error
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  return {
    profile,
    loading,
  };
}