import { ToastrService } from 'ngx-toastr';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(): void {
    this.clienteService.getClientes()
    .subscribe(clientes => this.clientes = clientes);
  }

  delete(cliente: Cliente): void {
    this.clientes = this.clientes.filter(c => c !== cliente);
    this.clienteService.deleteCliente(cliente)
    .subscribe(response => {
      this.toastr.success('Cadastro deletado com sucesso!');
    });
  }


}
