import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Field, form, FormValueControl } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { Spinner } from '../../loader/components/spinner/spinner';
import {
  asyncScheduler,
  catchError,
  debounceTime,
  EMPTY,
  filter,
  fromEvent,
  map,
  NEVER,
  of,
  switchMap,
  tap,
  throttleTime,
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
    @if(label()) {
    <label [for]="inputId()" class="text-white text-xs leading-none">{{
      (label() | translate) + (required() ? '*' : '')
    }}</label>
    }

    <div class="relative">
      <input
        #inputEl
        [(ngModel)]="inputModel"
        [id]="inputId()"
        [placeholder]="placeholder() | translate"
        (focus)="onFocus()"
        (blur)="onBlur()"
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

      <div class="absolute text-white/50 right-0 top-1/2 -translate-y-1/2 mr-1.5">
        @if(value() !== null || true) {
        <div
          (click)="onResetClick()"
          class="transition-all cursor-pointer flex justify-center items-center rounded-full hover:bg-white/10 h-6 w-6"
        >
          <lucide-icon class="h-4 w-4" name="x" />
        </div>
        }
      </div>

      <ul
        class="absolute z-10 inset-x-0 top-full mt-2 p-1 bg-charcoal-light flex flex-col gap-2 rounded-md border border-white/10"
        [class.hidden]="isOpen() === false"
      >
        @let state = inputState(); @switch(state) { @case('loading'){
        <dc-spinner />
        } @case ('empty') { type something in } @case('loaded') { @for(option of options(); track
        option.symbol) { @let symbol = option.symbol;

        <li
          (click)="onOptionClick(symbol)"
          class="flex justify-between items-center transition-all p-2 rounded-sm hover:bg-white/10"
        >
          {{ symbol }}

          @if(symbol === value()) {
          <lucide-icon class="h-4 w-4" name="check" />
          }
        </li>
        } } @case('error') { error occurred } }
      </ul>
    </div>
  `,
})
export class InputSymbol implements FormValueControl<string | null>, AfterViewInit {
  public inputModel = model<string>('');
  public inputState = signal<'loading' | 'empty' | 'loaded' | 'error'>('empty');

  public value = model<string | null>(null);
  public touched = model<boolean>(false);
  public required = input<boolean>(false);

  public options = signal<{ name: string; symbol: string }[]>([]);

  public inputId = input.required<string>();

  private _inputEl = viewChild.required('inputEl', { read: ElementRef });
  private _destroyRef = inject(DestroyRef);

  public optionLabel = computed(() => {
    return '';
  });

  public label = input<string>();
  public placeholder = input<string>();

  public isOpen = signal<boolean>(false);

  private _http = inject(FinanceHttpService);

  public ngAfterViewInit(): void {
    const { nativeElement } = this._inputEl();

    fromEvent<InputEvent>(nativeElement, 'input')
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((ev) => (ev.target as HTMLInputElement).value),
        filter((symbol) => symbol.length !== 0),
        tap(() => this.inputState.set('loading')),
        debounceTime(1000),
        switchMap((symbol) =>
          this._http.searchSymbol$(symbol).pipe(
            catchError(() => {
              this.inputState.set('error');
              return EMPTY;
            })
          )
        )
      )
      .subscribe({
        next: ({ result }) => {
          this.options.set(result);
          this.inputState.set('loaded');
        },
      });
  }

  public onFocus(): void {
    this.isOpen.set(true);
  }

  public onOptionClick(value: string): void {
    this.value.set(value);
  }

  public onResetClick(): void {
    this.value.set(null);
  }

  public onBlur(): void {
    this.touched.set(true);
    this.isOpen.set(false);
  }
}
