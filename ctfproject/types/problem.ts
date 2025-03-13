export type Problem = {
    pro_id: number;
    pro_name: string;
    pro_description: string;
    created_by: number; // user id
    created_date: string;
}

export type AllProblems = Problem[]

export type CreateProblemData = {
    pro_name: string;
    pro_description: string;
}

export type CreateProblemResponse = {
    message: string;
    pro_id: number | undefined;
}

export type FileUploadData = {
    problem_name: string;
    problem_id: number;
    file: File;
}

export type FileUploadResult = {
    message: string;
    key: string | undefined;
}