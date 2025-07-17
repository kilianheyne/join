import { Contact } from "../interfaces/contact";

export class ContactModel {
  static fromFirestore(id: string, data: any): Contact {
    return {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
      color: data.color
    };
  }
}