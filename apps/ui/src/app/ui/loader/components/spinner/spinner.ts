import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-spinner',
  imports: [LucideAngularModule],
  host: {
    class: 'flex w-full h-full justify-center items-center',
  },
  template: `
    <lucide-icon
      class="text-white h-6 w-6 animate-spin [animation-duration:1.8s]"
      name="loader-circle"
    ></lucide-icon>
  `,
})
export class Spinner {}
