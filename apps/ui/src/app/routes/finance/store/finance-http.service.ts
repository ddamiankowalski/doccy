import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FinanceFields, FinanceEntry, SectionName } from './finance.store';
import { map, Observable } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';

type Response = {
  status: number;
};

type EntryFieldsResponse = {
  result: InputField[];
} & Response;

type FieldsResponse = {
  result: InputField[];
} & Response;

type EntryAddResponse = {
  result: FinanceEntry;
} & Response;

type EntryRemoveResponse = {} & Response;

type EntriesResponse<T> = {
  result: T;
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
   * Returns fields for adding an item for
   * finance entry
   *
   * @param name
   * @returns
   */
  public fetchFields$(name: SectionName, type: string): Observable<InputField[]> {
    return this._http
      .get<FieldsResponse>(`api/${name}/add-fields`, { params: { type } })
      .pipe(map(({ result }) => result));
  }

  /**
   * Returns all entries for a given section
   *
   * @param name
   * @returns
   */
  public fetchEntries$<T extends FinanceEntry>(name: SectionName): Observable<T> {
    return this._http
      .get<EntriesResponse<T>>(`api/${name}/entries`)
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

  /**
   * Removes entry from finance
   *
   * @param name
   * @param model
   * @returns
   */
  public removeEntry$(name: SectionName, id: string): Observable<EntryRemoveResponse> {
    return this._http.delete<EntryRemoveResponse>(`/api/${name}/entry-remove`, { body: { id } });
  }
}
