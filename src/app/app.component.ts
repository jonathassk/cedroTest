import { Component, OnInit } from '@angular/core';
import { Client } from './models/Client';
import { ClientsService } from './service/clients.service';
import { NgForm } from '@angular/forms';
import { Field } from './interfaces/Field';
import { async } from 'rxjs/internal/scheduler/async';

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
      await this.clientService.updateClient(this.client).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      await this.clientService.postClient(this.client).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getClients() {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
      if (this.clients.length == 0) {
        this.getClientsByStorage();
      }
      localStorage.setItem("contatos", JSON.stringify(clients))
    });
  }

  getClientsByStorage () {
    this.clients = JSON.parse(localStorage.getItem("contatos"));
    this.clients.map(item => {
      this.clientService.postClient(item).subscribe();
    })
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