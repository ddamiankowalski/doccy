import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  OnInit,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'dc-modal',
  template: `
    <div
      animate.enter="fade-in"
      class="flex justify-center items-center fixed w-full h-full"
      style="background-color: rgba(0, 0, 0, 0.5);"
      #backdrop
      (click)="onBackdropClick($event)"
    >
      <ng-container #container />
    </div>
  `,
})
export class Modal<T> implements OnInit, OnDestroy, AfterViewInit {
  @HostListener('document:keydown.escape')
  public onKeydownHandler() {
    this._close();
  }

  public onBackdropClick(ev: MouseEvent): void {
    ev.stopPropagation();
    const element = this._backdropElement();

    if (element && ev.target === element.nativeElement) {
      this._close();
    }
  }

  public ref = input.required<ComponentRef<Modal<T>>>();
  public component = input.required<Type<T>>();

  private _backdropElement = viewChild('backdrop', { read: ElementRef });
  private _container = viewChild('container', { read: ViewContainerRef });

  public ngOnInit(): void {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  public ngAfterViewInit(): void {
    const component = this.component();
    const container = this._container();

    if (container) {
      container.createComponent(component);
    }
  }

  public ngOnDestroy(): void {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  private _close(): void {
    const ref = this.ref();
    ref.destroy();
  }
}
