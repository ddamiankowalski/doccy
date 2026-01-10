import { Component, inject } from "@angular/core";
import { Modal } from "../../../../ui/overlay/components/modal";

@Component({
  selector: 'dc-finance-add',
  template: `i am finance add`
})
export class FinanceAdd {
  public modal = inject(Modal);

  constructor() {
    const ref = this.modal.ref();
    ref.setInput('title', 'another title');
  }
}
