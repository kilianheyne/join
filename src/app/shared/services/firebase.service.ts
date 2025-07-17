import { Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, DocumentReference } from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  unsubscribe: () => void;
  contactsList: Contact[] = [];

  constructor(
    private firestore: Firestore
  ) {
    const contactsRef = collection(this.firestore, 'contacts');

    this.unsubscribe = onSnapshot(contactsRef, (snapshot) => {
      this.contactsList = [];
      snapshot.forEach((doc) => {
        this.contactsList.push(this.setContactObject(doc.id, doc.data()));
      });
    });
  }

  setContactObject(id: string, obj: any): Contact {
    return {
      id: id,
      name: obj.name,
      email: obj.email,
      phone: obj.phone,
      avatar: obj.avatar,
      color: obj.color
    };
  }

  async addContactToDatabase(contact: Contact): Promise<DocumentReference> {
  return await addDoc(collection(this.firestore, 'contacts'), {
    ...contact,
    timestamp: serverTimestamp()
  });
}

  async updateContactInDatabase(id: string, contact: Contact) {
    await updateDoc(doc(this.firestore, 'contacts', id), contact as { [key: string]: any });
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