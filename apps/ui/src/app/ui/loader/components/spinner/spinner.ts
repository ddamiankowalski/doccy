import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-spinner',
  imports: [LucideAngularModule],
  template: ` <lucide-icon class="h-5 w-5 animate-spin" name="loader-circle"></lucide-icon> `,
})
export class Spinner {}
