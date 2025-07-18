export interface Task {
    id?: string;
    category: string;
    date: Date;
    description: string;
    priority: string;
    status: string;
    subtasks: { title: string, done: boolean }[];
    title: string;
    users:[];
}
