// ProblemTimer.tsx
'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card'

interface ProblemTimerProps {
  problem_name?: string;
  timeRemain?: string;
  difficulty?: number;
}

export default function ProblemCard({
  problem_name = 'name problem',
  timeRemain = 'xxxxxx',
}: ProblemTimerProps) {

  return (
    <Card className="w-full rounded-full shadow-md mb-4">
      <CardContent className="p-2 flex items-center justify-between">
        <div className="flex-1">
            <span className="text-lg font-medium pl-2">{problem_name}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4">
            <span className="text-lg">time remain : {timeRemain}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}