import React from 'react'
import ProblemCard from './ProblemCard'

const CourseAllProblem = ({ courseId }: { courseId: string }) => {
  return (
    <div>
        <ProblemCard/>
        <ProblemCard
        problem_name="Fibonacci Sequence" 
        timeRemain="01:30:00" 
      />
      <ProblemCard
        problem_name="Calculus" 
        timeRemain="02:30:00"  
      />
    </div>
  )
}

export default CourseAllProblem