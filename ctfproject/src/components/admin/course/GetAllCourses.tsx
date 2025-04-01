// This hook handles the data fetching logic
import { useState, useEffect } from "react";
import { AllCourses } from "../../../../types/course";

interface Permissions {
  globalPermissions: string[];
  coursePermissions: string[];
}

export function getAllCourses() {
  const [courses, setCourses] = useState<AllCourses>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          "https://cyberctfproject.fewpz.xyz/api/courses/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data: AllCourses = await response.json();
        for (let i = 0; i < data.length; i++) {
          const permission = await fetch(
            `https://cyberctfproject.fewpz.xyz/api/roles/my-permissions/${data[i].course_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
          );
          const permissionData: Permissions = await permission.json();
          if (
            !permissionData.coursePermissions.find(
              (element) => element === "add_problem"
            )
          ) {
            data.splice(i, 1);
            i--;
          }
        }
        setCourses(data);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, isLoading, error };
}
