import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EntryFields, FinanceEntry, SectionName } from './finance.store';
import { map, Observable } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';

type Response = {
  status: number;
};

type EntryFieldsResponse = {
  result: InputField[];
} & Response;

type EntryAddResponse = {
  result: FinanceEntry;
} & Response;

@Injectable({
  providedIn: 'root',
})
export class FinanceHttpService {
  private _http = inject(HttpClient);

  /**
   * Returns fields for adding an entry in a finance
   * section
   *
   * @param name
   * @returns
   */
  public fetchEntryFields$(name: SectionName): Observable<InputField[]> {
    return this._http
      .get<EntryFieldsResponse>(`api/${name}/entry-fields`)
      .pipe(map(({ result }) => result));
  }

  /**
   * Adds an entry for a given section
   *
   * @param name
   * @param model
   * @returns
   */
  public addEntry$(name: SectionName, model: object): Observable<FinanceEntry> {
    return this._http
      .post<EntryAddResponse>(`/api/${name}/entry-add`, model)
      .pipe(map(({ result }) => result));
  }
}
