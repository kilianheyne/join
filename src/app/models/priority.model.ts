import { Priority } from "../interfaces/priority";

export class PriorityModel {
  static fromFirestore(id: string, data: any): Priority {
    return {
      id,
      title: data.title,
      icon: data.icon,
      color: data.color,
      order: data.order,
    };
  }

  static sort(a: Priority, b: Priority): number {
    return a.order - b.order;
  }
}