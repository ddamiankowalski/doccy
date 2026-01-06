import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset, SectionType } from './type';
import { InputField } from '../../../ui/input/input-form/input-form';

type Response = {
  status: number;
};

type AssetsResponse = {
  entries: Asset[];
} & Response;

type FieldsResponse = {
  fields: InputField[];
} & Response;

@Injectable({
  providedIn: 'root',
})
export class FinanceHttpService {
  private _http = inject(HttpClient);

  public fetchFields$(type: SectionType): Observable<FieldsResponse> {
    return this._http.get<FieldsResponse>(`api/${type}/add-fields`);
  }

  public fetchAssets$(): Observable<AssetsResponse> {
    return this._http.get<AssetsResponse>('api/assets');
  }
}
