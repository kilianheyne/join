import { Task } from "../interfaces/task";

export class TaskModel {
    static fromFirestore(id: string, data: any): Task {
        return {
        id,
        category: data.category,
        date: data.date?.toDate?.() || new Date(),
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        subtasks: data.subtasks,
        users: data.users
        };
    }
}