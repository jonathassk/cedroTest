import { Injectable } from '@angular/core';
import {Client} from '../models/Client';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url = 'http://localhost:3000/clientes';
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'cache-Control': 'no-cache, no-store, must-revalidate'})
  };

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.url).pipe(retry(1), catchError(this.handleError));
  }

  postClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.url, JSON.stringify(client), this.httpOptions).pipe(retry(0), catchError(this.handleError));
  }

  updateClient(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(`${this.url}/${client.id}`, JSON.stringify(client), this.httpOptions)
      .pipe(retry(0), catchError(this.handleError));
  }

  deleteClient(client: Client): Observable<Client> {
    return this.httpClient.delete<Client>(`${this.url}/${client.id}`, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `${error.status} - ${error.message}`;
    }
    return throwError(errorMsg);
  }

}
