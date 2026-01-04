import { Component } from '@angular/core';
import { InputText } from '../../../../ui/input/input-text/input-text';

@Component({
  selector: 'dc-finance-add',
  imports: [InputText],
  template: ` <dc-input-text label="I am label" /> `,
})
export class FinanceAdd {}
