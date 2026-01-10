import { Component, signal } from "@angular/core";
import { IconButton } from "../../button/icon-button/icon-button";

@Component({
  selector: 'dc-table',
  imports: [IconButton],
  template: `
        <table class="w-full table-fixed ">
        <thead class="bg-charcoal-light ">
          <tr class="border-b border-white/5 ">
            <th class="w-1/3 px-4 py-3 text-left font-semibold text-gray-400 text-xs">Name</th>
            <th class="w-1/3 px-4 py-3 text-left font-semibold text-gray-400 text-xs">Artist</th>
            <th class="w-1/3 px-4 py-3 text-left font-semibold text-gray-400 text-xs">Date</th>
          </tr>
        </thead>
      </table>
  <div class="max-h-100 overflow-y-auto">
        <table class="w-full table-fixed text-xs">
          <tbody>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <tr class="border-b border-white/5 hover:bg-white/5">
              <td class="w-1/3 px-4 py-4">The Sliding Mr. Bones</td>
              <td class="w-1/3 px-4 py-4">Malcolm Lockyer</td>
              <td class="w-1/3 px-4 py-4">1961</td>
            </tr>
            <!-- more rows -->
          </tbody>
        </table>
      </div>

            <div class="flex gap-2 mt-2 items-center justify-center text-gray-400 text-xs font-medium">
        <dc-icon-button (clicked)="onPreviousClick()" name="chevron-left" />
        <span>Page {{ currentPage() }} of {{ allPages() }}</span>
        <dc-icon-button (clicked)="onNextClick()" name="chevron-right" />
      </div>`
})
export class Table {
    public currentPage = signal<number>(0);
  public allPages = signal<number>(10);

  public onPreviousClick(): void {
    this.currentPage.update((page) => --page);
  }

  public onNextClick(): void {
    this.currentPage.update((page) => ++page);
  }
}
