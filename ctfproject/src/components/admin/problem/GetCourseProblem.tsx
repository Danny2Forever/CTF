import { useState, useEffect } from 'react'
import { AllCourseProblem } from '../../../../types/problem'

export function GetCourseProblem(courseId: string)  {
    
    const [allCourseProblem, setAllCourseProblem] = useState<AllCourseProblem>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchCourseProblems() {
            try {
                const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN

                const allProblemResponse = await fetch(`http://141.11.158.213:3000/api/problems/course/${courseId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!allProblemResponse.ok) {
                    setError(new Error("Can't fetch problems now, please try again"))
                    setIsLoading(false)
                    return
                }

                const allCourseProblemData: AllCourseProblem = await allProblemResponse.json();

                setAllCourseProblem(allCourseProblemData)
                setIsLoading(false)

            } catch (err) {
                setError(err instanceof Error ? err : new Error('An unknown error occurred'))
                setIsLoading(false)
            }
        }

        fetchCourseProblems();
    }, [courseId])
    return { allCourseProblem , isLoading, error }

}
