import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ClienteService } from '../../services/cliente.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  mensajes=[];
  mensaje :string =" "; 
  elemento:any; 

  constructor(private chatService: ChatService) {
   this.chatService.cargarMensajes().subscribe((mensajes)=>{
     console.log('menssaddddddaaaaaaaaaaaaaaaaaaaaaaaaaaa', mensajes);
     setTimeout(()=>{
      this.elemento.scrollTop = this.elemento.scrollHeight;
     },20)
     this.mensajes = mensajes;
   })
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
