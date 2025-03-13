export type Course = {
    course_id: number; // course id
    course_name: string; // course name
    description: string; // course description
    created_by: number; // user id who created the course
}

export type AllCourses = Course[]; // list of courses

export type CreateCourseData = {
    course_name: string; // course name
    course_description: string; // course description
}
export type CreateCourseResponse = {
    message: string;
    courseId?: number;
}
