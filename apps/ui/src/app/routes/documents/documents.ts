import { Component } from '@angular/core';
import { Disclaimer } from '../../ui/components/disclaimer/disclaimer';

@Component({
  selector: 'dc-documents',
  host: {
    class: 'flex items-center justify-center min-h-[400px]',
  },
  template: ` <dc-disclaimer
    title="Documents Coming Soon"
    description="Documents management features will be available here"
    icon="layout-dashboard"
  />`,
  imports: [Disclaimer],
})
export class Documents {}
