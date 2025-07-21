import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskNotificationComponent } from './add-task-notification.component';

describe('AddTaskNotificationComponent', () => {
  let component: AddTaskNotificationComponent;
  let fixture: ComponentFixture<AddTaskNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
