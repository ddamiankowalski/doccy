import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormValueControl } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Spinner } from '../../loader/components/spinner/spinner';
import {
  catchError,
  debounceTime,
  EMPTY,
  filter,
  fromEvent,
  map,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FinanceHttpService } from '../../../routes/finance/store/finance-http.service';

@Component({
  selector: 'dc-input-symbol',
  imports: [LucideAngularModule, TranslatePipe, Spinner, FormsModule],
  host: {
    class: `flex flex-col h-full w-full relative gap-2`,
  },
  template: `
    @if (label()) {
      <label [for]="inputId()" class="text-white text-xs leading-none">{{
        (label() | translate) + (required() ? '*' : '')
      }}</label>
    }

    <div class="relative">
      @if (value() === null) {
        <input
          #inputEl
          [(ngModel)]="inputModel"
          [id]="inputId()"
          [placeholder]="placeholder() | translate"
          (focus)="onFocus()"
          (blur)="onBlur()"
          (input)="onInput()"
          autocomplete="off"
          type="text"
          class="bg-charcoal-light
        w-full
        h-8.5
        border border-white/50
        rounded-md
        px-3 py-2
        text-white
        hover:text-white
        text-xs
        placeholder:text-white/30
        focus:outline-none
        focus:ring-3
        focus:ring-offset-1
        focus:text-white
        focus:ring-white/20
        transition"
        />
      } @else {
        <div
          class="flex
        pl-3
        justify-between
        items-center
        group/select relative mt-auto bg-charcoal-light
        h-8.5
        cursor-pointer
        w-full
        border border-white/50
        rounded-md
        px-1 py-2
        text-xs
        text-white/50"
          (click)="onSelectClick()"
        >
          {{ value() }}
        </div>
      }

      <div class="absolute text-white/50 right-0 top-1/2 -translate-y-1/2 mr-1.5">
        <div
          (click)="onResetClick()"
          class="transition-all cursor-pointer flex justify-center items-center rounded-full hover:bg-white/10 h-6 w-6"
        >
          <lucide-icon class="h-4 w-4" [name]="value() === null ? 'search' : 'x'" />
        </div>
      </div>

      <ul
        class="absolute z-10 inset-x-0 top-full mt-2 p-1 bg-charcoal-light flex flex-col gap-2 rounded-md border border-white/10"
        [class.hidden]="isOpen() === false"
      >
        @let state = inputState();
        @let inputValue = inputModel();
        @if (inputValue.length === 0) {
          <div class="pointer-events-none flex items-center gap-1.5 p-2 text-xs text-white/30">
            <lucide-icon class="w-3.5 h-3.5" name="info" />
            <span>Type something in</span>
          </div>
        } @else {
          @switch (state) {
            @case ('loading') {
              <dc-spinner class="block py-4" />
            }
            @case ('empty') {
              <div class="pointer-events-none flex items-center gap-1.5 p-2 text-xs text-white/30">
                <lucide-icon class="w-3.5 h-3.5" name="info" />
                <span>No results</span>
              </div>
            }
            @case ('loaded') {
              @for (option of options(); track option.symbol) {
                @let symbol = option.symbol; @let name = option.name;

                <li
                  (click)="onOptionClick(symbol)"
                  class="flex text-xs cursor-pointer justify-between items-center transition-all p-2 rounded-sm hover:bg-white/10"
                >
                  <div class="flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span>{{ symbol }}</span>
                    <p class="text-white/30 overflow-hidden text-ellipsis">{{ name }}</p>
                  </div>

                  @if (symbol === value()) {
                    <lucide-icon class="h-4 w-4" name="check" />
                  }
                </li>
              }
            }
            @case ('error') {
              <div class="pointer-events-none flex items-center gap-1.5 p-2 text-xs text-white/30">
                <lucide-icon class="w-3.5 h-3.5" name="bug" />
                <span>Error occurred, contact administrator</span>
              </div>
            }
          }
        }
      </ul>
    </div>
  `,
})
export class InputSymbol implements FormValueControl<string | null>, AfterViewInit {
  public inputModel = signal<string>('');
  public inputState = signal<'loading' | 'empty' | 'loaded' | 'error'>('empty');

  public value = model<string | null>(null);
  public touched = model<boolean>(false);
  public required = input<boolean>(false);

  public options = signal<{ name: string; symbol: string }[]>([]);

  public inputId = input.required<string>();

  private _inputEl = viewChild.required('inputEl', { read: ElementRef });
  private _destroyRef = inject(DestroyRef);
  private _http = inject(FinanceHttpService);
  private _document = inject(DOCUMENT);
  private _elementRef = inject(ElementRef);
  private _input$ = new Subject<void>();

  public optionLabel = computed(() => {
    return '';
  });

  public label = input<string>();
  public placeholder = input<string>();

  public isOpen = signal<boolean>(false);

  constructor() {
    fromEvent(this._document.body, 'click')
      .pipe(
        takeUntilDestroyed(),
        filter(({ target }) => {
          const { nativeElement } = this._elementRef;
          return !nativeElement.contains(target);
        }),
      )
      .subscribe((ev) => {
        ev.stopPropagation();
        this.isOpen.set(false);
      });
  }

  public ngAfterViewInit(): void {
    this._emitInput();
  }

  public onSelectClick(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }

  public onFocus(): void {
    this.isOpen.set(true);
  }

  public onOptionClick(value: string): void {
    this.value.set(value);
    this.isOpen.set(false);
  }

  public onResetClick(): void {
    this.value.set(null);

    setTimeout(() => {
      this._inputEl().nativeElement.focus();
    }, 100);
  }

  public onBlur(): void {
    this.touched.set(true);
  }

  public onInput(): void {
    this._input$.next();
  }

  private _emitInput(): void {
    this._input$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map(() => {
          const { nativeElement } = this._inputEl();
          return nativeElement.value;
        }),
        filter((symbol) => symbol.length !== 0),
        tap(() => this.inputState.set('loading')),
        debounceTime(1000),
        switchMap((symbol) =>
          this._http.searchSymbol$(symbol).pipe(
            catchError(() => {
              this.inputState.set('error');
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe({
        next: ({ result }) => {
          this.options.set(result);

          if (result.length === 0) {
            this.inputState.set('empty');
          } else {
            this.inputState.set('loaded');
          }
        },
      });
  }
}
