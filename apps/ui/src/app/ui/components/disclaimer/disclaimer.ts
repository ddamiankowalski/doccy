import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-disclaimer',
  imports: [LucideAngularModule],
  host: {
    class: 'text-center',
  },
  template: `
    <div class="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
      <lucide-icon class="h-8 w-8" [name]="icon()"></lucide-icon>
    </div>

    <h3 class="text-lg font-semibold text-white mb-2">{{ title() }}</h3>
    <p class="text-gray-400 text-sm">{{ description() }}</p>
  `,
})
export class Disclaimer {
  public icon = input.required<string>();
  public title = input.required<string>();
  public description = input.required<string>();
}
