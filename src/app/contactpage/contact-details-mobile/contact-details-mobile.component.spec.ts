import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsMobileComponent } from './contact-details-mobile.component';

describe('ContactDetailsMobileComponent', () => {
  let component: ContactDetailsMobileComponent;
  let fixture: ComponentFixture<ContactDetailsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetailsMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDetailsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
