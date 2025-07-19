import { Category } from "../interfaces/category";

export class CategoryModel {
    static fromFirestore(id: string, data: any): Category {
        return {
            id,
            title: data.title,
            color: data.color,
        };
    }
}