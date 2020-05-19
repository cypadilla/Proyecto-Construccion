import { Component, OnInit } from '@angular/core';
import { ClienteService} from '../../services/cliente.service';
import { ChatService } from '../../services/chat.service';
import {AngularFireAuth} from'angularfire2/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private clienteService: ClienteService,
               private afAuth: AngularFireAuth,
               private chatService: ChatService) { }
  public isLogged: boolean = false;

  ngOnInit() {
    this.getEstadoUsuario();
  }
 
  getEstadoUsuario(){
    this.clienteService.autenticacion().subscribe(autenticacion => {
      if(autenticacion){
        console.log('Usuario logeado');
        this.isLogged = true;
      }else{
        console.log('Usuario NO LOGUEADO');
        this.isLogged = false;
      }
    });
  }
  logOut(){
    console.log("Cerrando sesion...");
    this.chatService.logOut();
    return(this.afAuth.auth.signOut());
  }

}
