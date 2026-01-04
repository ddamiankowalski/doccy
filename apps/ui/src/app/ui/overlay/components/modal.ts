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
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'dc-modal',
  imports: [Tile, LucideAngularModule],
  template: `
    <div
      animate.enter="fade-in"
      class="flex justify-center items-center fixed w-full h-full"
      style="background-color: rgba(0, 0, 0, 0.5);"
      #backdrop
      (pointerdown)="onBackdropClick($event)"
    >
      <div class="w-[min(30rem,100vw)] min-h-0">
        <dc-tile>
          <header class="flex items-start justify-between mb-6 gap-8">
            <div class="flex flex-col gap-2">
              @if(title()) {
              <span class="text-white text-lg font-medium leading-none">{{ title() }}</span>
              } @if(description()) {
              <span class="text-gray-400 text-xs font-medium">{{ description() }}</span>
              }
            </div>

            <button
              class="group/button flex items-center justify-center h-8 w-8 rounded-full
         hover:bg-white/10 cursor-pointer transition-colors"
              (click)="onCloseClick()"
            >
              <lucide-icon
                class="h-5 w-5 text-gray-400
           group-hover/button:text-white
           transition-colors"
                name="x"
              ></lucide-icon>
            </button>
          </header>

          <ng-container #container />
        </dc-tile>
      </div>
    </div>
  `,
})
export class Modal<T> implements OnInit, OnDestroy, AfterViewInit {
  @HostListener('document:keydown.escape')
  public onKeydownHandler() {
    this._close();
  }

  public onCloseClick(): void {
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
