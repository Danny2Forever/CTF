// AdminAllCourse component is used to display all the courses in the admin panel
// fetch courses data here
import React from 'react'
import { AllCourses } from '../../../../types/course'
import AdminCourseCard from './AdminCourseCard'

const courses: AllCourses = [
    {
        course_id: 1,
        course_name: "Introduction to Programming",
        course_description: "A beginner course...",
        created_by: 1
    },
    {
        course_id: 2,
        course_name: "Calculus 101",
        course_description: "Fundamentals of Calculus",
        created_by: 1
    },
    {
        course_id: 3,
        course_name: "Test Course",
        course_description: "Course TO Test",
        created_by: 5
    },
    {
        course_id: 4,
        course_name: "Test Course ii",
        course_description: "Test",
        created_by: 5
    },
    {
        course_id: 5,
        course_name: "New Course",
        course_description: "HAhahahaha these nuts",
        created_by: 5
    },
    {
        course_id: 6,
        course_name: "sumetlmao",
        course_description: "nuiawhfoia",
        created_by: 5
    }
]
const AdminAllCourse = () => {
  return (
    <div>
        {courses.map((course) => (
            <AdminCourseCard 
                key={course.course_id} 
                course_id={course.course_id} 
                course_name={course.course_name} 
                course_description={course.course_description} 
                created_by={course.created_by} 
            />
        ))}
    </div>
  )
}

export default AdminAllCourse