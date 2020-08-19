import { Component, OnInit } from '@angular/core';
import { Client } from './models/Client';
import { ClientsService } from './service/clients.service';
import {NgForm, NgModel} from '@angular/forms';
import { States } from '../assets/selectOptions/states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  client = {} as Client;
  clients: Client[];
  states: string[];

  constructor(private clientService: ClientsService) {

  }

  ngOnInit(): void {
    this.getClients();
    this.getStates();
  }

  async postClient(form: NgForm): Promise<void> {
    if (this.client.id !== undefined) {
        await this.clientService.updateClient(this.client).subscribe(() => {
          this.cleanForm(form);
        });
      } else {
      await this.clientService.postClient(this.client).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getClients(): void {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      if (this.clients.length === 0 && localStorage.getItem('contatos')) {
        this.getClientsByStorage();
      }
      localStorage.setItem('contatos', JSON.stringify(clients));
    });
  }

  getClientsByStorage(): void {
    this.clients = JSON.parse(localStorage.getItem('contatos'));
    this.clients.map(item => {
      this.clientService.postClient(item).subscribe();
    });
  }

  deleteClient(client: Client): void {
    this.clientService.deleteClient(client).subscribe(() => {
      if (this.clients.length === 1){
        localStorage.removeItem('contatos');
      }
      this.getClients();
    });
  }

  editClient(client: Client): void {
    this.client = {...client};
  }

  cleanForm(form: NgForm): void {
    this.getClients();
    form.resetForm();
    this.client = {} as Client;
  }

  getStates(): void {
    this.states = States;
  }
}
