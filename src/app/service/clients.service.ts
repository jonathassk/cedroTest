import { Injectable } from '@angular/core';
import {Client} from '../models/Client';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  constructor() { }


  getClients(): Client[] {
    let data = JSON.parse(localStorage.getItem("client") || '[]');
    return data;
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

}
