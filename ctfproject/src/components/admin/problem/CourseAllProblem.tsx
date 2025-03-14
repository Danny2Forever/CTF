import React from 'react'
import ProblemCard from './ProblemCard'
import { GetCourseProblem } from './GetCourseProblem'

const CourseAllProblem = ({ courseId }: { courseId: string }) => {

  const { allCourseProblem , isLoading, error } = GetCourseProblem(courseId)

  if (isLoading) {
    return <div>Loading problem...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (allCourseProblem.length === 0) {
    return (
      <div>
        No problem found
      </div>
    )
  }
  return (
    <div>
      {allCourseProblem.map((problem) => (
        <ProblemCard key={problem.pro_id} problem_name={problem.pro_name} due_date={problem.expiration_date ? problem.expiration_date.split('T')[0] : 'No due date'}/>
      ))
      }
    </div>
  )
}

export default CourseAllProblem