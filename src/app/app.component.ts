import { Component, OnInit } from '@angular/core';
import { Client } from './models/Client';
import { ClientsService } from './service/clients.service';
import { NgForm } from '@angular/forms';
import { Field } from './interfaces/Field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
 
  client = {} as Client;
  clients: Client[];
  
  constructor(private clientService: ClientsService) {

  }

  ngOnInit() { 
    this.getClients();
  }

  async postClient(form: NgForm) {
    if(this.client.id !== undefined) {
      await this.clientService.updateClient(this.client);
      this.cleanForm(form);
      this.getClients();
    } else {
      await this.clientService.postClient(this.client);
      this.cleanForm(form);
      this.getClients();
    }
  }

  getClients() {
    this.clientService.getCars().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client).subscribe(() => {
      this.getClients();
    });
  }

  editClient (client: Client) {
    this.client = {...client};
  }

  cleanForm(form: NgForm) {
    this.getClients();
    form.resetForm();
    this.client = {} as Client;
  }
}