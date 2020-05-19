import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap, timeout} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {NGXLogger} from 'ngx-logger';
import {APIRestServerError} from '../model/restapi/apirest-server-error';

@Injectable({
  providedIn: 'root'
})
// Based on the code in https://medium.com/@krishna.acondy/a-generic-http-service-approach-for-angular-applications-a7bd8ff6a068
export class ApiRestClientService {
  url = environment.apiEndpoint;

  constructor(private httpClient: HttpClient,
              private logger: NGXLogger) { }

  private createAPIServerError(err: HttpErrorResponse): APIRestServerError {
    if (err.error) {
      const serverError: APIRestServerError = {
        url: err.url,
        message: err.error.error,
        detailedMessage: err.error.message,
        status: err.error.status
      };
      return serverError;
    } else {
      const serverError: APIRestServerError = {
        url: null,
        message: null,
        detailedMessage: JSON.stringify(err),
        status: null
      };
      return serverError;
    }
  }

  public getList$<T>(endpoint: string): Observable<T[]> {
    let url: string;
    url = `${this.url}/${endpoint}`;
    this.logger.debug('RestClientService#getList ' + url);

    return this.httpClient.get<T[]>(url).pipe(
      catchError(err => throwError(this.createAPIServerError(err))) // required to return an observable
    );
  }

  public getBlob$(endpoint: string): Observable<Blob> {
    let url: string;
    url = `${this.url}/${endpoint}`;
    this.logger.debug('RestClientService#getBlob ' + url);
    return this.httpClient.get(url, {responseType: 'blob'}).pipe(
      catchError(err => throwError(this.createAPIServerError(err))) // required to return an observable
    );
    // Errors are handled in ErrorInterceptor
      // catchError(this.errorHandlingService.handleHttpError(endpoint, null))
      // catchError((err: HttpErrorResponse) => this.errorHandlingService.handleHttpError('TO-DO', err, endpoint, null))
  }

  public get$<T>(endpoint: string): Observable<T> {
    let url: string;
    url = `${this.url}/${endpoint}`;
    this.logger.debug('RestClientService#get ' + url);
    return this.httpClient.get<T>(url).pipe(
      catchError(err => throwError(this.createAPIServerError(err))) // required to return an observable
    );
  }

  public post$<T>(endpoint: string, body: any): Observable<T> {

    let url: string;
    url = `${this.url}/${endpoint}`;

    this.logger.debug('RestClientService#post ' + url);

    const headers = new HttpHeaders();
    const utcOffset = -(new Date().getTimezoneOffset());
    headers.append('Content-Type', 'application/json');
    headers.append('utc-offset', utcOffset.toString());
    headers.append('platform', 'WEB');
    headers.append('app-version', '1.00');
    headers.append('version', '1.0');
    headers.append('accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');


    return this.httpClient.post<T>(url, body, { headers }).pipe(
      timeout(1000), // para evitar errores con el servidor
      catchError(err => throwError(this.createAPIServerError(err))) // required to return an observable
    );
  }

  public put$<T>(endpoint: string, body: any): Observable<T> {

    let url: string;
    url = `${this.url}/${endpoint}`;

    this.logger.debug('RestClientService#put ' + url);

    return this.httpClient.put<T>(url, body).pipe(
      catchError(err => throwError(this.createAPIServerError(err))) // required to return an observable
    );
  }

  public delete$<T>(endpoint: string, id: any): Observable<T> {

    let url: string;
    url = `${this.url}/${endpoint}/${id}`;

    this.logger.debug('RestClientService#put ' + url);

    return this.httpClient.delete<T>(url).pipe(
      catchError(err => throwError(this.createAPIServerError(err))) // required to return an observable
    );
  }
}
