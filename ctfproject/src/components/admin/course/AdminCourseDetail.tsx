import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// fetch coruse detail

const AdminCourseDetail = ({ courseId }: { courseId: string }) => {
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
            <h3 className="text-3xl font-bold">Name</h3>
            <p className="text-md text-gray-600">Instuctor</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Course Description</h3>
          <p className="text-gray-700 text-sm">
          Lorem ipsum dolor sit amet consectetur. Tellus ultricies ut et phasellus a purus. Neque ac nisi sit velit et morbi ipsum convallis in. Sollicitudin ridiculus bibendum non volutpat bibendum faucibus elementum. Pellentesque enim quis augue pharetra libero at ultricies sed. Nullam faucibus ullamcorper mattis vel feugiat amet senectus sed.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminCourseDetail