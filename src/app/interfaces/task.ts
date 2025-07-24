import { Subtask } from "./subtask";

export enum TaskStatus {
    ToDo = 'to-do',
    InProgress = 'in-progress',
    AwaitFeedback = 'await-feedback',
    Done = 'done'
}

export interface Task {
    id?: string;
    title: string;
    description: string;
    date: Date;
    category?: string;
    priority?: string;
    subtasks: Subtask[];
    users: (string | undefined)[];
    status: TaskStatus;
}
