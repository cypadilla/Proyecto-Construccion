import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../modelos/cliente'
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router';
import {AngularFireAuth} from'angularfire2/auth';

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.css']
})
export class ClienteFormularioComponent implements OnInit {

  cliente = {} as Cliente;
  private email: string;
  private pass: string; 
  constructor(
    public clienteService: ClienteService,
    private router: Router,
    private angularFireAuth: AngularFireAuth
    ) { }

  ngOnInit() {
  }
  crearCliente(){
    this.clienteService.registrarUsuario(email,pass)
    .then((usuario) => {
      this.router.navigate(['home']);
    }).catch(err => console.error('error',err));
  }
  addClientes(){
    this.clienteService.addClientes(this.cliente)
    console.log(this.cliente);
    this.cliente ={} as Cliente;
  }
}
