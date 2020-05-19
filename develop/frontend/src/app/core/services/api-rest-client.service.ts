import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
    const serverError: APIRestServerError = {
      url: err.url,
      message: err.error.error,
      detailedMessage: err.error.message,
      status: err.error.status
    };
    return serverError;
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

  processErrorPost(err: any): Observable<never> {
    debugger;
    return throwError(this.createAPIServerError(err));
  }

  public post$<T>(endpoint: string, body: any): Observable<T> {

    let url: string;
    url = `${this.url}/${endpoint}`;

    this.logger.debug('RestClientService#post ' + url);

    return this.httpClient.post<T>(url, body).pipe(
      timeout(1000), // para evitar errores con el servidor
      catchError(err => this.processErrorPost(this.createAPIServerError(err))) // required to return an observable
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
