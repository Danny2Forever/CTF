import { useEffect, useState } from "react";
import { AllProblems } from "../../../types/problem";

// Regular async function for fetching data (no hooks)
export async function fetchProblemData(
  course_id: number | undefined
): Promise<AllProblems> {
  try {
    const token =
      localStorage.getItem("token") || process.env.NEXT_PUBLIC_ADMIN_TOKEN;

    if (!course_id) {
      return [];
    }

    const response = await fetch(
      `http://141.11.158.213:3000/api/problems/course/${course_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch problems");
    }

    const data: AllProblems = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching problem data:", error);
    return [];
  }
}

// Custom hook for components to use
export function useProblemData(course_id: number | undefined) {
  const [problems, setProblems] = useState<AllProblems>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadProblems() {
      if (!course_id) {
        setProblems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchProblemData(course_id);
        setProblems(data);
        setError(null);
      } catch (err) {
        console.error("Error in useProblemData:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    }

    loadProblems();
  }, [course_id]);

  return { problems, loading, error };
}
