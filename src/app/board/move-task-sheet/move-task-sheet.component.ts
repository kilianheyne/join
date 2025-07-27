import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Task, TaskStatus } from '../../interfaces/task';


@Component({
  selector: 'app-move-task-sheet',
  imports: [],
  templateUrl: './move-task-sheet.component.html',
  styleUrl: './move-task-sheet.component.scss'
})
export class MoveTaskSheetComponent {
  TaskStatus = TaskStatus; 

  constructor(private bottomSheetRef: MatBottomSheetRef<MoveTaskSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { task: Task }) {}
  

  moveTo(status: TaskStatus): void {
    this.bottomSheetRef.dismiss(status);
  }
}
