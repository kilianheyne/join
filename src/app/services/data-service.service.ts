import { Injectable, Signal, signal } from '@angular/core';
import { TaskStatus } from '../interfaces/task';

@Injectable()
export class DataService {
  private _value = signal<TaskStatus | null>(null);
  value: Signal<TaskStatus | null> = this._value.asReadonly();

  setValue(status: TaskStatus) {
    this._value.set(status);
  }
}