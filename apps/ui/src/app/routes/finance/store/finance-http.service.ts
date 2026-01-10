import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EntryFields, SectionName } from './finance.store';
import { map, Observable } from 'rxjs';
import { InputField } from '../../../ui/input/input-form/type';

type Response = {
  status: number;
};

type EntryFieldsResponse = {
  result: InputField[];
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
}
