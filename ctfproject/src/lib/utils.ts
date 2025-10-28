import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchCurrentUser() {
  try {
    const response = await fetch("/api/users/me", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to fetch current user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current user:", error);
  }
}
