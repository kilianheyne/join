import { MatDateFormats } from '@angular/material/core';

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/yyyy', // format user can type
  },
  display: {
    dateInput: 'DD/MM/yyyy', // format shown in input
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'DD/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};