import { Priority } from "../interfaces/priority";

export class PriorityModel {
  static fromFirestore(id: string, data: any): Priority {
    return {
      id,
      title: data.title,
      icon: data.icon,
      color: data.color
    };
  }
}