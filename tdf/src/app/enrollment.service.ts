import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  _url = 'http://localhost:3000';
  constructor(private _http: HttpClient ) { }

  enrol(user: User) {
    return this._http.post<any> (this._url+'/enroll', user)
      .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
