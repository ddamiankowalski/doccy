import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-disclaimer',
  imports: [LucideAngularModule],
  host: {
    class: 'block text-center',
  },
  template: `
    <div
      class="h-16 w-16 rounded-full bg-white/5 text-white/50 flex items-center justify-center mx-auto mb-4"
    >
      <lucide-icon class="h-6 w-6" [name]="icon()"></lucide-icon>
    </div>

    @if (title(); as title) {
      <h3 class="text-lg font-semibold text-white mb-2">{{ title }}</h3>
    }

    @if (description(); as description) {
      <p class="text-gray-400 font-normal text-sm">{{ description }}</p>
    }

    <ng-content />
  `,
})
export class Disclaimer {
  public icon = input.required<string>();
  public title = input<string>();
  public description = input<string>();
}
