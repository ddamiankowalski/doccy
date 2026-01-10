import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetsHttpService {
  private _http = inject(HttpClient);

  public fetchSections$;
}
