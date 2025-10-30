export type Course = {
  id: number;
  courseName: string;
  courseDescription: string;
  createdAt: string;
};

export type AllCourses = Course[]; // list of courses

export type CreateCourseData = {
    course_name: string; // course name
    course_description: string; // course description
}
export type CreateCourseResponse = {
    message: string;
    courseId?: number;
}
