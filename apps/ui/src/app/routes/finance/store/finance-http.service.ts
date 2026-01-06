import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type FinanceResponse = {
  sections: [];
};

@Injectable({
  providedIn: 'root',
})
export class FinanceHttpService {
  private _http = inject(HttpClient);

  public fetch$(): Observable<FinanceResponse> {
    return this._http.get<FinanceResponse>('api/finance');
  }
}
