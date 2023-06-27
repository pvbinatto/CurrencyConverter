import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { catchError, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  get<T>(url: string): Observable<any> {
    return this.http
      .get<T>(url, this.SetHeaderJson())
      .pipe(
        take(1)
      )
  }

  post(url: string, data: any): Observable<any> {
    return this.http
      .post<any>(url, data, this.SetHeaderJson())

      .pipe(
        map((res: any) => {
          return res;
        }),
        take(1)
      )
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

  put(url: string, data: any): Observable<any> {
    return this.http
      .put<any>(url, data, this.SetHeaderJson())
      .pipe(
        map((res: any) => res),
        take(1)
      )
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }

  delete(url: string): Observable<any> {
    return this.http
      .delete<any>(url, this.SetHeaderJson())
      .pipe(
        map((res: any) => res),
        take(1)
      )
      .pipe(
        catchError((error) => {
          return this.handleError(error);
        })
      );
  }
}
