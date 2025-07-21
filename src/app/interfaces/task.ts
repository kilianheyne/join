import { Subtask } from "./subtask";

export interface Task {
    id?: string;
    title: string;
    description: string;
    date: Date;
    category?: string;
    priority?: string;
    subtasks: Subtask[];
    users: (string | undefined)[];
    status: 'to-do' | 'in-progress' | 'await-feedback' | 'done';
}
