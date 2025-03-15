// This hook handles the data fetching logic
import { useState, useEffect } from 'react'
import { Course } from '../../../../types/course'
import { User } from '../../../../types/user'

export function getCourse(courseId: string) {
    const [course, setCourse] = useState<Course>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchCourse() {
            try {
                const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;

                const courseResponse = await fetch(`https://cyberctfproject.duckdns.org/api/courses/${courseId}`,
                    {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!courseResponse.ok) {
                    throw new Error('Failed to fetch courses')
                }

                const courseData: Course = await courseResponse.json()
                setCourse(courseData)
                setIsLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'))
                setIsLoading(false)
            }

        }
        
        fetchCourse()
    }, [courseId])
    return { course, isLoading, error }
}