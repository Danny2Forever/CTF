import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCourse } from './GetCourse';
import AdminCourseSelectButton from '../buttons/AdminCourseSelectButton';

const AdminCourseCard = ({ courseId }: { courseId: string }) => {
  const { course, user, isLoading, error } = getCourse(courseId)

  if (isLoading) {
    return <div>Loading courses...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Card key={courseId} className="bg-white mb-4">
      <CardContent>
        <div className="flex items-start space-x-4">
          <div className="w-18 h-18 bg-gray-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-[#777676] text-white">
                CyberSecurity
              </Badge>
            </div>
            <h3 className="text-lg font-bold">{course?.course_name}</h3>
            <p className="text-sm text-gray-600">{user?.first_name} {user?.last_name}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className='cursor-pointer'>delete course</Button>
            {/* This div make button not shifting when it on loading */}
            <div className='h-10 w-25'>
              <AdminCourseSelectButton courseId={courseId} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminCourseCard