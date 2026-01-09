import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset, Liability, SectionType } from './type';
import { FormModel, InputField } from '../../../ui/input/input-form/type';

type Response = {
  status: number;
};

type FetchResponse<T> = {
  entries: T[];
} & Response;

type FieldsResponse = {
  fields: InputField[];
} & Response;

type PostResponse<T> = { result: T } & Response;

type SymbolResponse = {
  result: { name: string; symbol: string }[];
} & Response;

@Injectable({
  providedIn: 'root',
})
export class FinanceHttpService {
  private _http = inject(HttpClient);

  public fetchFields$(type: SectionType): Observable<FieldsResponse> {
    return this._http.get<FieldsResponse>(`api/${type}/add-fields`);
  }

  public fetchAssets$(): Observable<FetchResponse<Asset>> {
    return this._http.get<FetchResponse<Asset>>('api/assets');
  }

  public fetchLiabilities$(): Observable<FetchResponse<Liability>> {
    return this._http.get<FetchResponse<Liability>>('api/liabilities');
  }

  public postEntry$<T = any>(type: SectionType, model: FormModel): Observable<PostResponse<T>> {
    return this._http.post<PostResponse<T>>(`api/${type}`, model);
  }

  public searchSymbol$(symbol: string): Observable<SymbolResponse> {
    return this._http.get<SymbolResponse>('api/market/search', { params: { symbol } });
  }
}
