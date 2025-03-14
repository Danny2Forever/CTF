import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCourse } from './GetCourse'

// fetch course detail

const AdminCourseDetail = ({ courseId }: { courseId: string }) => {
  const { course, user,  isLoading, error } = getCourse(courseId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }


  return (
    <Card className="bg-[#D9D9D9] mb-4 shadow-none border-0">
      <CardHeader>
        <div className="flex items-start space-x-4">
          <div className="w-32 h-32 bg-white rounded-xl"></div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-[#777676] text-white">
                CyberSecurity
              </Badge>
            </div>
            <h3 className="text-3xl font-bold">{course?.course_name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</h3>
            <p className="text-md text-gray-600">Instructor: {user?.first_name} {user?.last_name}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Course Description</h3>
          <p className="text-gray-700 text-sm">
            {course?.description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminCourseDetail