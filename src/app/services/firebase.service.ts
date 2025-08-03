import { Injectable, OnDestroy } from '@angular/core';
import { Firestore, collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc, DocumentReference, query, getDocs, where } from '@angular/fire/firestore';
import { Contact } from '../interfaces/contact';
import { Priority } from '../interfaces/priority';
import { ContactModel } from '../models/contact.model';
import { PriorityModel } from '../models/priority.model';
import { Task } from '../interfaces/task';
import { TaskModel } from '../models/task.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Category } from '../interfaces/category';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  unsubscribeAll: (() => void)[] = [];

  private _contactsList = new BehaviorSubject<Contact[]>([]);
  public contactsList$ = this._contactsList.asObservable();
  contactsList: Contact[] = [];

  private _prioritiesList = new BehaviorSubject<Priority[]>([]);
  public prioritiesList$ = this._prioritiesList.asObservable();
  prioritiesList: Priority[] = [];

  private _categoriesList = new BehaviorSubject<Category[]>([]);
  public categoriesList$ = this._categoriesList.asObservable();
  categoriesList: Category[] = [];

  private _tasksList = new BehaviorSubject<Task[]>([]);
  public tasksList$ = this._tasksList.asObservable();
  tasksList: Task[] = [];

  constructor(private firestore: Firestore) {
    this.subscribeToCollection<Contact>('contacts', this._contactsList, this.contactsList, ContactModel.fromFirestore);
    this.subscribeToCollection<Priority>('priorities', this._prioritiesList, this.prioritiesList, PriorityModel.fromFirestore);
    this.subscribeToCollection<Category>('categories', this._categoriesList, this.categoriesList, CategoryModel.fromFirestore);
    this.subscribeToCollection<Task>('tasks', this._tasksList, this.tasksList, TaskModel.fromFirestore)
  }

  private subscribeToCollection<T>(
    collectionName: string,
    subject: BehaviorSubject<T[]>,
    targetArray: T[],
    transform: (id: string, data: any) => T
  ): void {
    const colRef = collection(this.firestore, collectionName);

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const newItems: T[] = [];
      snapshot.forEach((doc) => {
        newItems.push(transform(doc.id, doc.data()));
      });

      targetArray.length = 0;
      targetArray.push(...newItems);
      subject.next([...newItems]);
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

  async getContactByEmail(email: string): Promise<Contact | null> {
    const colRef = collection(this.firestore, 'contacts');
    const q = query(colRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return {
        id: docSnap.id,
        ...(docSnap.data() as Contact)
      };
    }

    return null;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.forEach(unsub => unsub());
  }
}

function col(firestore: Firestore, arg1: string) {
  throw new Error('Function not implemented.');
}
