export const getToken = (): string => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";
  }
  return (
    localStorage.getItem("token") || process.env.NEXT_PUBLIC_ADMIN_TOKEN || ""
  );
};

export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export const parseJwt = (token: string): Record<string, unknown> | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export async function login() {
  const username = "Admin1";
  const password = "Admin1";

  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      console.log("Login successful.");
      console.log("Token:", data.token);
    } else {
      console.log("Login failed.");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}
