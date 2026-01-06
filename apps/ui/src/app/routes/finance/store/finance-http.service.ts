import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinanceHttpService {
  private _http = inject(HttpClient);

  public fetch$(): Observable<any> {
    return this._http.get('');
  }
}
