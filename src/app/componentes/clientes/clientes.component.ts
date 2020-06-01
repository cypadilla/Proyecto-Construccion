import { Component, OnInit } from '@angular/core';
import { ClienteService } from'../../services/cliente.service';
import { Cliente } from '../../modelos/cliente'
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes =[];
  clienteEditar:Cliente;
  editar:boolean = false;
  constructor(public clienteService:ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe( clientes => {
      console.log(clientes)
      this.clientes = clientes;
    });
  }
  eliminarCliente(event,cliente){
    console.log(cliente);
    this.clienteService.deleteClientes(cliente);
  }

  editarCliente($event,cliente){
    this.clienteEditar = cliente;
    console.log("id cliente",cliente.id)
    this.editar=!this.editar;
  }

  actualizarCliente(){
    this.clienteService.actualizarCliente(this.clienteEditar);
    this.clienteEditar = {} as Cliente;
    this.editar = false; 
  }
} 
