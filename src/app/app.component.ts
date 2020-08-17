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

  postClient(form: NgForm) {
    if(this.client.id !== undefined) {
      this.clientService.updateClient(this.client).subscribe(() => {
        this.cleanForm(form);
      })
    } else {
      this.clientService.postClient(this.client).subscribe(() => {
        this.cleanForm(form);
      })
    }
  }

  getClients() {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    })
  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client).subscribe(() => {
      this.getClients();
    })
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