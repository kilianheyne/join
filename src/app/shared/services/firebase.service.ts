import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Contacts } from '../interfaces/contacts';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  firestore = inject(Firestore);
  unsubscribe: () => void;
  contatctsList: Contacts[] = [];

  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'contact'), (contact) => {
      this.contatctsList = [];
      contact.forEach((element) => {
        this.contatctsList.push(this.setContactObject(element.id, element.data()));
      });
      console.log(this.contatctsList);
    });
  }

  setContactObject(id: string, obj: any): Contacts {
    return {
      id: id,
      firstname: obj.firstname,
      lastname: obj.lastname,
      phone: obj.phone,
      email: obj.email
    };
  }

  async addContactToDatabase(contact: Contacts) {
    await addDoc(collection(this.firestore, 'contact'), contact);
  }

  async updateContactInDatabase(id: string, contact: Contacts) {
    await updateDoc(doc(this.firestore, 'contact', id), {
      firstname: contact.firstname,
      lastname: contact.lastname,
      phone: contact.phone,
      email: contact.email
    });
  }

  async deleteContactFromDatabase(id: string) {
    await deleteDoc(doc(this.firestore, 'contact', id));
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}