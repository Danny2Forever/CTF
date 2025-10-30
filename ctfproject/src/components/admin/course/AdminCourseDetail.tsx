import React from 'react'
import { Book, User, Info, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCourse } from './GetCourse'

const AdminCourseDetail = ({ courseId }: { courseId: string }) => {
  const { course, user, isLoading, error } = getCourse(courseId)

  // Loading State
  if (isLoading) {
    return (
      <Card className="bg-gray-50 border-dashed border-gray-300">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2 text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading course details...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Error State
  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Info className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-700 mb-2">Course Details Unavailable</h3>
            <p className="text-red-600">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // No Course Found State
  if (!course) {
    return (
      <Card className="bg-gray-50 border-dashed border-gray-300">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Book className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Course Not Found</h3>
            <p className="text-gray-600">The requested course could not be retrieved.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Format course name (convert to title case and replace underscores)
  const formatCourseName = (name: string) => 
    name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center space-x-6">
          {/* Placeholder Course Image */}
          <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
            <Book className="h-12 w-12 text-gray-400" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="bg-blue-600 text-white">
                CyberSecurity
              </Badge>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-1">
              {formatCourseName(course.courseame)}
            </h2>
            
            {user && (
              <div className="flex items-center text-gray-600 space-x-1">
                <User className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  Instructor: {user.first_name} {user.last_name}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">
            Course Description
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {course.description || 'No description available.'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminCourseDetail