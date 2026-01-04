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
import { Tile } from '../../components/tile/tile';

@Component({
  selector: 'dc-modal',
  imports: [Tile],
  template: `
    <div
      animate.enter="fade-in"
      class="flex justify-center items-center fixed w-full h-full"
      style="background-color: rgba(0, 0, 0, 0.5);"
      #backdrop
      (pointerdown)="onBackdropClick($event)"
    >
      <dc-tile>
        <div class="flex flex-col mb-4 gap-1">
          @if(title()) {
          <span class="text-white text-md font-medium">{{ title() }}</span>
          } @if(description()) {
          <span class="text-gray-400 text-xs font-medium">{{ description() }}</span>
          }
        </div>

        <ng-container #container />
      </dc-tile>
    </div>
  `,
})
export class Modal<T> implements OnInit, OnDestroy, AfterViewInit {
  @HostListener('document:keydown.escape')
  public onKeydownHandler() {
    this._close();
  }

  public onBackdropClick(ev: PointerEvent): void {
    ev.stopPropagation();
    const element = this._backdropElement();

    if (element && ev.target === element.nativeElement && this.closeOnBackdrop()) {
      this._close();
    }
  }

  public ref = input.required<ComponentRef<Modal<T>>>();
  public component = input.required<Type<T>>();

  public title = input<string>();
  public description = input<string>();
  public closeOnBackdrop = input<boolean>();

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
