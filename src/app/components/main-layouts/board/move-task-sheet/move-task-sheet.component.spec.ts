import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveTaskSheetComponent } from './move-task-sheet.component';

describe('MoveTaskSheetComponent', () => {
  let component: MoveTaskSheetComponent;
  let fixture: ComponentFixture<MoveTaskSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveTaskSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveTaskSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
