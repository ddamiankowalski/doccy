import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type Response = {
  status: number;
};

type EquityResponse = { result: any[] } & Response;

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private _http = inject(HttpClient);

  /**
   * Returns equity
   *
   * @param symbol
   */
  public searchEquity$(symbol: string): Observable<EquityResponse> {
    return this._http.get<EquityResponse>('api/market/search-equity', { params: { symbol } });
  }
}
