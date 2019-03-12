import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClienteService {

  private clienteUrl = 'http://192.168.15.16:8099/api/Clientes';

  constructor(
    private http: HttpClient,
  ) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl);
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${this.clienteUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  addCliente(cliente: Cliente) {
    return this.http.post<Cliente>(this.clienteUrl, cliente, httpOptions);
  }

  deleteCliente(cliente: Cliente | number): Observable<Cliente> {
    const id = typeof cliente === 'number' ? cliente : cliente.cli_id;
    const url = `${this.clienteUrl}/${id}`;
    return this.http.delete<Cliente>(url, httpOptions);
  }
}
