// This hook handles the data fetching logic
import { useState, useEffect } from 'react'
import { Course } from '../../../../types/course'
import { User } from '../../../../types/user'

export function getCourse(courseId: string) {
    const [course, setCourse] = useState<Course>()
    const [user, setUser] = useState<User>()
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
                
                // Only proceed with user fetch if we have a valid created_by ID
                if (courseData?.created_by) {
                    const userResponse = await fetch(`https://cyberctfproject.duckdns.org/api/users/getUser/${courseData.created_by}`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    });

                    if (!userResponse.ok) {
                        throw new Error('Failed to fetch user')
                    }

                    const userData: User = await userResponse.json()
                    setUser(userData)
                }
                
                setIsLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'))
                setIsLoading(false)
            }

        }
        
        fetchCourse()
    }, [courseId])
    return { course, user, isLoading, error }
}