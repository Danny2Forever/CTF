import { useEffect, useState } from "react";
import { AllProblems } from "../../../types/problem";

export function fetchCourseData(course_id: number | undefined): AllProblems {
  const [allProblems, setAllProblems] = useState<AllProblems>();
  const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://cyberctfproject.duckdns.org/api/problems/course/${course_id}`,
          {
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data: AllProblems = await response.json();
        console.log(data);
        setAllProblems(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
        return { error };
      }
    }
    fetchData();
  }, []);
  return allProblems || [];
}
