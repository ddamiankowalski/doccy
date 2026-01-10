import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetsHttpService {
  private _http = inject(HttpClient);

  public fetchEntries$(): Observable<any> {
    return this._http.get('api/assets/entries');
  }
}
