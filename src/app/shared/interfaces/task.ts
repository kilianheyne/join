export interface Task {
    id?: string;
    category: string;
    date: string;
    description: string;
    priority: string;
    status: string;
    subtasks: string[];
    title: string;
    users:[];
}
