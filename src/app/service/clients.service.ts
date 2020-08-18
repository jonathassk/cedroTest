import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Client} from '../models/Client';
import { v4 as uuidv4 } from 'uuid';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  url = 'http://localhost:3000/clientes';
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getClients(): Client[] {
    let data = JSON.parse(localStorage.getItem("client") || '[]');
    return data;
  }

  getClientById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.url}/${id}`).pipe(retry(1), catchError(this.handleError));
  } 

  postClient(client: Client): Client {
    let data = JSON.parse(localStorage.getItem("client") || '[]');
    client.id = uuidv4();
    data.push(client);
    localStorage.setItem("client", JSON.stringify(data));
    return client;
  }

  updateClient(client: Client): Client {
    let data = JSON.parse(localStorage.getItem("client") || '[]');
    let dataFiltered = data.filter(item => item.id !== client.id);
    console.log(client)
    dataFiltered.push(client);
    localStorage.setItem("client", JSON.stringify(dataFiltered));
    return data;
  }

  deleteClient(client: Client): Client[] {
    let data = JSON.parse(localStorage.getItem("client") || '[]');
    let dataFiltered = data.filter(item => item.id !== client.id)
    localStorage.setItem("client", JSON.stringify(dataFiltered));
    return data;
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `${error.status} -${error.message}`;
    }
    return throwError(errorMsg);
  }
}
