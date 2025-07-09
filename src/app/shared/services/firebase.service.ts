import { inject, Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Contacts } from '../interfaces/contacts';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  firestore = inject(Firestore);
  unsubscribe: () => void;
  contactsList: Contacts[] = [];
  
  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, 'contacts'), (contact) => {
      this.contactsList = [];
      contact.forEach((element) => {
        this.contactsList.push(this.setContactObject(element.id, element.data()));
      });
      console.log(this.contactsList);
    });
  }

  setContactObject(id: string, obj: any): Contacts {
    return {
      id: id,
      name: obj.name,
      phone: obj.phone,
      email: obj.email
    };
  }

  async addContactToDatabase(contact: Contacts) {
    await addDoc(collection(this.firestore, 'contacts'), contact);
  }

  async updateContactInDatabase(id: string, contact: Contacts) {
    await updateDoc(doc(this.firestore, 'contacts', id), {
      name: contact.name,
      phone: contact.phone,
      email: contact.email
    });
  }

  async deleteContactFromDatabase(id: string) {
    await deleteDoc(doc(this.firestore, 'contacts', id));
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}