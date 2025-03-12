import AdminCourseCard from './AdminCourseCard'
import { getAllCourses } from './GetAllCourses'

export default function AdminAllCourses() {
    const { courses, isLoading, error } = getAllCourses()

    if (isLoading) {
        return <div>Loading courses...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <>
            {courses.length > 0 ? (
                courses.map((course) => (
                    <AdminCourseCard
                        key={course.course_id}
                        courseId={String(course.course_id)}
                    />
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500">
                    No courses found
                </div>
            )}
        </>
    )
}