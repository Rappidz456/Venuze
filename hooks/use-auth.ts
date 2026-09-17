"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchSession, loginRequest, logoutRequest } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth-store";
import type { LoginPayload } from "@/types";

export function useSessionQuery() {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const user = await fetchSession();
      setUser(user);
      return user;
    },
    staleTime: 60_000,
  });
}

export function useLoginMutation() {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginRequest(payload),
    onSuccess: (user) => {
      setUser(user);
      void queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Welcome back", {
        description: "You’re signed in.",
      });
    },
    onError: (error: Error) => {
      toast.error("Couldn’t sign in", { description: error.message });
    },
  });
}

export function useLogoutMutation() {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      logout();
      queryClient.clear();
      toast.success("Signed out");
    },
  });
}
