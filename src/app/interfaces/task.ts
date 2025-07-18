export interface Task {
    id?: string; //Firestore ID?
    category: string;
    date: Date;
    title: string;
    description: string;
    priority: string; 
    status: string;
    subtasks: { title: string, done: boolean }[];
    users: []; 
}
