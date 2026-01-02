import { Component, ComponentRef, HostListener, input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'dc-modal',
  template: ` <div class="fixed w-full h-full bg-black opacity-50"></div> `,
})
export class Modal implements OnInit, OnDestroy {
  @HostListener('click')
  public onClick(): void {
    this.ref().destroy();
  }

  public ref = input.required<ComponentRef<Modal>>();

  public ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  public ngOnDestroy(): void {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}
