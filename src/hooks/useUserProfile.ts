"use client";

import { useEffect, useState } from "react";

import {
  getCurrentUserAttributes,
} from "../services/auth/authService";

import {
  getOrCreateMyProfile,
} from "../services/api/userApi";

type UserProfile = {
  id: string;
  name: string | null;
  email: string | null;
};

export function useUserProfile() {
  const [profile, setProfile] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        const attributes =
          await getCurrentUserAttributes();

        const name =
          attributes.name ?? "";

        const email =
          attributes.email ?? "";

        const result =
          await getOrCreateMyProfile(
            name,
            email
          );

        if (!cancelled) {
          setProfile(result);
        }
      } catch (error) {
        console.error(
          "Failed to load user profile:",
          error
        );
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
  }, []);

  return {
    profile,
    loading,
  };
}