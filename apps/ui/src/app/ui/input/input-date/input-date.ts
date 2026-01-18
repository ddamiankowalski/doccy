import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormValueControl } from '@angular/forms/signals';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { filter, fromEvent } from 'rxjs';

@Component({
  selector: 'dc-input-date',
  imports: [NgClass, LucideAngularModule, TranslatePipe],
  host: {
    class: `flex flex-col h-full w-full relative gap-2`,
  },
  template: `
    @if (label()) {
      <label [for]="inputId()" class="text-white text-xs leading-none">{{
        (label() | translate) + (required() ? '*' : '')
      }}</label>
    }

    <div
      #dateEl
      tabindex="0"
      [id]="inputId()"
      (blur)="onBlur()"
      class="flex
        justify-between
        items-center
        group/date relative mt-auto bg-charcoal-light
        h-8.5
        cursor-pointer
        w-full
        border border-white/50
        rounded-md
        px-1 py-2
        text-xs
        text-white/50
        focus:outline-none
        focus:ring-3
        focus:ring-offset-1
        focus:text-white
        focus:ring-white/20
        transition"
    >
      <span
        [ngClass]="value() !== null ? 'text-white' : 'text-white/30'"
        class="ml-2 group-focus-within/date:text-white"
      >
        @if (value() === null) {
          {{ placeholder() | translate }}
        } @else {
          {{ formattedDate() }}
        }
      </span>

      @if (value() !== null) {
        <div
          (click)="onResetClick($event)"
          class="transition-all flex justify-center items-center rounded-full hover:bg-white/10 h-6 w-6"
        >
          <lucide-icon class="h-4 w-4" name="x" />
        </div>
      } @else {
        <div class="flex justify-center items-center rounded-full h-6 w-6">
          <lucide-icon class="h-4 w-4" name="calendar" />
        </div>
      }

      <div
        class="absolute z-10 left-0 top-full mt-2 p-4 bg-charcoal-light flex flex-col gap-3 rounded-md border border-white/10 shadow-lg"
        [class.hidden]="isOpen() === false"
      >
        <div class="flex justify-between items-center gap-2 mb-2">
          <div class="flex gap-0">
            <button
              type="button"
              (click)="previousMonth($event)"
              class="flex cursor-pointer justify-center items-center rounded-full hover:bg-white/10 h-6 w-6 transition-all"
            >
              <lucide-icon class="h-4 w-4" name="chevron-left" />
            </button>

            <button
              type="button"
              (click)="previousYear($event)"
              class="flex cursor-pointer justify-center items-center rounded-full hover:bg-white/10 h-6 w-6 transition-all"
            >
              <lucide-icon class="h-4 w-4" name="chevrons-left" />
            </button>
          </div>

          <span class="text-white text-xs text-nowrap font-medium flex-1 text-center">
            {{ monthNames[currentMonth()] }} {{ currentYear() }}
          </span>

          <div class="flex gap-0">
            <button
              type="button"
              (click)="nextYear($event)"
              class="flex cursor-pointer justify-center items-center rounded-full hover:bg-white/10 h-6 w-6 transition-all"
            >
              <lucide-icon class="h-4 w-4" name="chevrons-right" />
            </button>

            <button
              type="button"
              (click)="nextMonth($event)"
              class="flex cursor-pointer justify-center items-center rounded-full hover:bg-white/10 h-6 w-6 transition-all"
            >
              <lucide-icon class="h-4 w-4" name="chevron-right" />
            </button>
          </div>
        </div>

        <!-- Day Names -->
        <div class="grid grid-cols-7 gap-1 mb-1">
          @for (day of dayNames; track day) {
            <div class="text-white/50 text-xs text-center w-8 h-8 flex items-center justify-center">
              {{ day }}
            </div>
          }
        </div>

        <!-- Calendar Days -->
        <div class="grid grid-cols-7 gap-1">
          @for (day of calendarDays(); track day.key) {
            <button
              type="button"
              (click)="onDateClick(day, $event)"
              [disabled]="!day.isCurrentMonth"
              [ngClass]="{
                'text-white/30 cursor-default': !day.isCurrentMonth,
                'text-white hover:bg-white/10':
                  day.isCurrentMonth && !day.isSelected && !day.isToday,
                'bg-white text-charcoal-light font-medium': day.isSelected,
              }"
              class="text-x text-white/30 text-center w-8 h-8 rounded-full transition-all flex items-center justify-center"
            >
              {{ day.date }}
            </button>
          }
        </div>

        <!-- Today Button -->
        <button
          type="button"
          (click)="selectToday($event)"
          class="mt-2 text-xs text-white/70 hover:text-white transition-all"
        >
          {{ 'Today' | translate }}
        </button>
      </div>
    </div>
  `,
})
export class InputDate implements FormValueControl<string | null> {
  @HostListener('click')
  public onClick(): void {
    this._dateEl().nativeElement.focus();
    this.isOpen.update((isOpen) => !isOpen);
  }

  private _document = inject(DOCUMENT);
  private _elementRef = inject(ElementRef);
  private _dateEl = viewChild.required('dateEl', { read: ElementRef });

  public value = model<string | null>(null); // Format: ISO date string
  public touched = model<boolean>(false);
  public required = input<boolean>(false);

  public inputId = input.required<string>();
  public label = input<string>();
  public placeholder = input<string>();

  public isOpen = signal<boolean>(false);
  public currentMonth = signal<number>(new Date().getMonth());
  public currentYear = signal<number>(new Date().getFullYear());

  public monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  public formattedDate = computed(() => {
    const dateValue = this.value();
    if (!dateValue) return '';

    const date = new Date(dateValue);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  });

  public calendarDays = computed(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    // Adjust so Monday = 0
    let firstDayOfWeek = firstDay.getDay() - 1;
    if (firstDayOfWeek === -1) firstDayOfWeek = 6;

    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: Array<{
      date: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      key: string;
      isoDate: string;
    }> = [];

    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const isoDate = new Date(prevYear, prevMonth, date).toISOString();

      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        key: `prev-${date}`,
        isoDate,
      });
    }

    // Current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = this.value();

    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(year, month, date);
      const isoDate = currentDate.toISOString();

      const isToday =
        today.getDate() === date && today.getMonth() === month && today.getFullYear() === year;

      const isSelected = selectedDate
        ? new Date(selectedDate).toDateString() === currentDate.toDateString()
        : false;

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        key: `current-${date}`,
        isoDate,
      });
    }

    // Next month days to fill the grid (6 rows * 7 days = 42 cells)
    const remainingDays = 42 - days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    for (let date = 1; date <= remainingDays; date++) {
      const isoDate = new Date(nextYear, nextMonth, date).toISOString();

      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        key: `next-${date}`,
        isoDate,
      });
    }

    return days;
  });

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

  public onDateClick(day: any, event: Event): void {
    event.stopPropagation();
    if (day.isCurrentMonth) {
      this.value.set(day.isoDate);
      this.isOpen.set(false);
    }
  }

  public onResetClick(event: Event): void {
    event.stopPropagation();
    this.value.set(null);
  }

  public previousMonth(event: Event): void {
    event.stopPropagation();
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update((year) => year - 1);
    } else {
      this.currentMonth.update((month) => month - 1);
    }
  }

  public nextMonth(event: Event): void {
    event.stopPropagation();
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update((year) => year + 1);
    } else {
      this.currentMonth.update((month) => month + 1);
    }
  }

  public previousYear(event: Event): void {
    event.stopPropagation();
    this.currentYear.update((year) => year - 1);
  }

  public nextYear(event: Event): void {
    event.stopPropagation();
    this.currentYear.update((year) => year + 1);
  }

  public selectToday(event: Event): void {
    event.stopPropagation();
    const today = new Date();
    this.value.set(today.toISOString());
    this.currentMonth.set(today.getMonth());
    this.currentYear.set(today.getFullYear());
    this.isOpen.set(false);
  }

  public onBlur(): void {
    this.touched.set(true);
  }
}
