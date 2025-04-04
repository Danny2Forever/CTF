"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"


const AdminAddProblemButton = ({ courseId }: { courseId: string }) => {
    const router = useRouter()

    const handleSelect = () => {
        router.push(`/admin-panel/admin-course/${courseId}/add-problem`)
    }

    return (
        <Button
            variant="outline"
            size="default"
            className='cursor-pointer rounded-2xl'
            onClick={handleSelect}
        >
            Add Problem
        </Button>
    )
}

export default AdminAddProblemButton