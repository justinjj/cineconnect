import {
  getCurrentUser,
  signOut,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

import { useEffect, useState } from "react";

import type { AuthUser } from "aws-amplify/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        setUser(currentUser);
      } catch {
        setUser(null)
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          loadUser();
          break;

        case "signedOut":
          setUser(null);
          break;
          
        case "tokenRefresh":
          loadUser();
          break;
      }
    });

    return unsubscribe;
  }, [])

  const logout = async () => {
    await signOut();
  };

  return {
    user,
    isAuthenticated: user !== null,
    loading,
    logout,
  };
}