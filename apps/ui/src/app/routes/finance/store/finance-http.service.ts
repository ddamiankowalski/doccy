import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from './type';

type AssetsResponse = {
  assets: Asset[];
};

@Injectable({
  providedIn: 'root',
})
export class FinanceHttpService {
  private _http = inject(HttpClient);

  public fetchAssets$(): Observable<AssetsResponse> {
    return this._http.get<AssetsResponse>('api/assets');
  }
}
