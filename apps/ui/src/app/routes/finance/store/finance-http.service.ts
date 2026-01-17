import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  FinanceFields,
  FinanceEntry,
  SectionName,
  EntryName,
  EntryRecord,
  Profit,
} from './finance.store';
import { map, Observable } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';
import { Stock } from './with-assets';

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

type EntryRecordResponse = {
  result: EntryRecord;
} & Response;

type EntryRemoveResponse = {} & Response;

type EntriesResponse = {
  result: Entry[];
} & Response;

type EntryResponse = {
  result: Entry;
} & Response;

type Entry = {
  id: string;
  section: SectionName;
  icon: string;
  type: string;
  name: string;
  profit?: Profit;
  value?: number;
  stocks?: Stock[];
};

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
  public fetchEntries$(name: SectionName): Observable<Entry[]> {
    return this._http.get<EntriesResponse>(`api/${name}/entries`).pipe(map(({ result }) => result));
  }

  /**
   * Fetches one entry
   *
   * @param name
   * @param id
   * @returns
   */
  public fetchEntry$(name: SectionName, id: string): Observable<Entry> {
    return this._http.get<EntryResponse>(`api/${name}/entry`).pipe(map(({ result }) => result));
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
   * Adds record for given entry
   *
   * @param name
   * @param type
   * @param model
   * @returns
   */
  public addEntryRecord$(
    name: SectionName,
    type: EntryName,
    entryId: string,
    model: object,
  ): Observable<EntryRecord> {
    return this._http
      .post<EntryRecordResponse>(`api/${name}/entry-record`, model, { params: { type, entryId } })
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
