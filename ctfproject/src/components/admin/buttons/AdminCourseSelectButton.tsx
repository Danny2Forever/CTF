"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"


const AdminCourseSelectButton = ({ courseId }: { courseId: string }) => {
    const router = useRouter()

    const handleSelect = () => {
        router.push(`admin-panel/admin-course/${courseId}`)
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className='cursor-pointer'
            onClick={handleSelect}
        >
            select Course
        </Button>
    )
}

export default AdminCourseSelectButton