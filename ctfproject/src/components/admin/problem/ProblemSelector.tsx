"use client"

import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Problem = {
  pro_id: number;
  pro_name: string;
  pro_description: string;
  created_by: number;
  created_date: string;
};

type ProblemSelectorProps = {
  onSelectProblem: (id: number) => void;
};

const ProblemSelector = ({ onSelectProblem }: ProblemSelectorProps) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('token') || process.env.NEXT_PUBLIC_ADMIN_TOKEN;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://cyberctfproject.fewpz.xyz/api/problems', {
            method: "GET",
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`
            }});
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setProblems(data);
      } catch (err) {
        console.error('Error fetching problems:', err);
        setError('Failed to load problems');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleValueChange = (value: string) => {
    const problemId = parseInt(value, 10);
    if (!isNaN(problemId)) {
      onSelectProblem(problemId);
    }
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="problem_select" className="text-right">
        Problem
      </Label>
      <div className="col-span-3">
        <Select onValueChange={handleValueChange} disabled={isLoading}>
          <SelectTrigger id="problem_select">
            <SelectValue placeholder={isLoading ? "Loading problems..." : "Select a problem"} />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {error && (
              <SelectItem value="error" disabled>
                Error loading problems
              </SelectItem>
            )}
            
            {!isLoading && !error && problems.length === 0 && (
              <SelectItem value="none" disabled>
                No problems available
              </SelectItem>
            )}
            
            {problems.map((problem) => (
              <SelectItem key={problem.pro_id} value={problem.pro_id.toString()}>
                {problem.pro_name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProblemSelector;