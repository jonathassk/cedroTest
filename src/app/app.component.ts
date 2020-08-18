import { Component, OnInit } from '@angular/core';
import { Client } from './models/Client';
import { ClientsService } from './service/clients.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'cedro';
  client = {} as Client;
  clients: Client[];

  constructor(private clientService: ClientsService) {}

  ngOnInit() { this.getClients(); }

  async postClient(form: NgForm) {
    if(this.client.id !== undefined) {
      this.clientService.updateClient(this.client).subscribe(() => {
        this.cleanForm(form);
      })
    } else {
      await this.clientService.postClient(this.client);
      this.cleanForm(form);
      this.getClients();
    }
  }

  getClients() {
    this.clients = this.clientService.getClients();
  }

  deleteClient(client: Client) {
    this.clients = this.clientService.deleteClient(client);
    this.getClients();
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