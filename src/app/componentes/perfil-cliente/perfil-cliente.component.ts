import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../modelos/cliente';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  constructor( private clienteService : ClienteService) { }
 
  public providerId: string = 'null';

  cliente : Cliente = {
    email: '',
    photoURL: '',
  };
  ngOnInit() {
    this.clienteService.autenticacion().subscribe( usuario => {
      if(usuario){
        this.cliente.displayName  = usuario.displayName; 
        this.cliente.email = usuario.email;
        this.cliente.photoURL = usuario.photoURL;
        this.providerId = usuario.providerData[0].providerId;
        console.log ('Usuario recuperado ',usuario);  
        console.log('User',this.cliente); 
      }
    });
    this.cliente
  }

}