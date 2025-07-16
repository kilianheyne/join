import { Directive, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[trimOnBlur]',
  standalone: true
})
export class TrimOnBlurDirective {
  constructor(private ngModel: NgModel) {}

  @HostListener('blur')
  onBlur() {
    const value = this.ngModel.viewModel?.trim();
    this.ngModel.control.setValue(value);
  }
}