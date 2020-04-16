import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../modelos/cliente'
import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.css']
})
export class ClienteFormularioComponent implements OnInit {

  cliente = {} as Cliente;

  constructor(public clienteService: ClienteService) { }

  ngOnInit() {
  }
  addClientes(){
    this.clienteService.addClientes(this.cliente)
    console.log(this.cliente);
    this.cliente ={} as Cliente;
  }
}
