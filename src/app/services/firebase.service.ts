import { Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, DocumentReference } from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';
import { Priority } from '../interfaces/priority';
import { ContactModel } from '../models/contact.model';
import { PriorityModel } from '../models/priority.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  unsubscribeAll: (() => void)[] = [];
  contactsList: Contact[] = [];
  prioritiesList: Priority[] = [];

  constructor(private firestore: Firestore) {
    this.subscribeToCollection<Contact>('contacts', this.contactsList, ContactModel.fromFirestore);
    this.subscribeToCollection<Priority>('priorities', this.prioritiesList, PriorityModel.fromFirestore);
  }

  private subscribeToCollection<T>(
    collectionName: string,
    targetArray: T[],
    transform: (id: string, data: any) => T
  ): void {
    const colRef = collection(this.firestore, collectionName);

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      targetArray.length = 0;
      snapshot.forEach((doc) => {
        targetArray.push(transform(doc.id, doc.data()));
      });
    });

    this.unsubscribeAll.push(unsubscribe);
  }

  async addDataToDatabase<T extends Record<string, any>>(
    collectionName: string,
    data: T
  ): Promise<DocumentReference> {
    const colRef = collection(this.firestore, collectionName);
    return await addDoc(colRef, data);
  }

  async updateDataInDatabase<T extends Record<string, any>>(
    collectionName: string,
    id: string,
    data: T
  ): Promise<void> {
    await updateDoc(doc(this.firestore, collectionName, id), data);
  }

  async deleteDataFromDatabase(
    collectionName: string,
    id: string
  ): Promise<void> {
    await deleteDoc(doc(this.firestore, collectionName, id));
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.forEach(unsub => unsub());
  }
}