import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ClienteService } from '../../services/cliente.service';
import {Router} from '@angular/router';
import { MensajeForo } from '../../modelos/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  mensajeForo :MensajeForo;
  msg: string=" ";
  foro :any;
  mensajesForo=[];
  estadoChat:boolean = false;
  mensajes=[];
  mensaje :string =" "; 
  elemento:any; 
  userinter :any = {};

  constructor(private chatService: ChatService,
              private clienteService : ClienteService,
              private router: Router) {


    this.clienteService.autenticacion().subscribe((user)=>{
    this.userinter = user;
    console.log('usuario traido',this.userinter.uid)
    });            
   this.chatService.cargarMensajes().subscribe((mensajes)=>{
     console.log('mensajes', mensajes);
     setTimeout(()=>{
      this.elemento.scrollTop = this.elemento.scrollHeight;
     },20)
     this.mensajes = mensajes;
   });

   
   }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
    
  }

  enviarMensaje(){
    console.log(this.mensaje);
    if( this.mensaje.length == 0){
      return;
    }
    this.chatService.agregarMensaje(this.mensaje)
    .then(()=>{
      console.log("se envio el mensaje");
      this.mensaje = "";
    }).catch((err)=>{
      console.error("no se envio el mensaje",err)
      this.mensaje = "";
    });
  }

  
 
}
