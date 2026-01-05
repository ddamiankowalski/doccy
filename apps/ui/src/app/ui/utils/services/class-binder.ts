import { effect, ElementRef, inject, Signal } from '@angular/core';

export class ClassBinder {
  private _elementRef = inject(ElementRef);

  /**
   * Binds a class conditionally
   *
   * @param condition
   * @param className
   */
  public conditionalBind(condition: Signal<boolean>, className: string): void {
    effect(() => {
      if (condition()) {
        this._elementRef.nativeElement.classList.add(className);
      } else {
        this._elementRef.nativeElement.classList.remove(className);
      }
    });
  }
}
