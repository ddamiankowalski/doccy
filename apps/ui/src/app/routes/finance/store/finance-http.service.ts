import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SectionName, EntryName, EntryRecord, Profit, Stock } from './finance.store';
import { map, Observable } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';

/**
 * Generic response for http
 * requests
 */
type Response<T = {}> = {
  status: number;
  result: T;
};

export type EntryResponse = {
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
      .get<Response<InputField[]>>(`api/${name}/entry-fields`)
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
      .get<Response<InputField[]>>(`api/${name}/add-fields`, { params: { type } })
      .pipe(map(({ result }) => result));
  }

  /**
   * Returns all entries for a given section
   *
   * @param name
   * @returns
   */
  public fetchEntries$(name: SectionName): Observable<EntryResponse[]> {
    return this._http
      .get<Response<EntryResponse[]>>(`api/${name}/entries`)
      .pipe(map(({ result }) => result));
  }

  /**
   * Fetches one entry
   *
   * @param name
   * @param id
   * @returns
   */
  public fetchEntry$(name: SectionName, id: string): Observable<EntryResponse> {
    return this._http
      .get<Response<EntryResponse>>(`api/${name}/entry`)
      .pipe(map(({ result }) => result));
  }

  /**
   * Adds an entry for a given section
   *
   * @param name
   * @param model
   * @returns
   */
  public addEntry$(name: SectionName, model: object): Observable<EntryResponse> {
    return this._http
      .post<Response<EntryResponse>>(`/api/${name}/entry-add`, model)
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
  ): Observable<EntryResponse> {
    return this._http
      .post<
        Response<EntryResponse>
      >(`api/${name}/entry-record`, model, { params: { type, entryId } })
      .pipe(map(({ result }) => result));
  }

  /**
   * Removes entry from finance
   *
   * @param name
   * @param model
   * @returns
   */
  public removeEntry$(name: SectionName, id: string): Observable<Response> {
    return this._http.delete<Response>(`/api/${name}/entry-remove`, { body: { id } });
  }
}
