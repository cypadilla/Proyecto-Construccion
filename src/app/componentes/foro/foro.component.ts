import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ClienteService } from '../../services/cliente.service';
import {Router} from '@angular/router';
import { MensajeForo } from '../../modelos/mensaje';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {

  mensajeForo :MensajeForo;
  msg: string=" ";
  foro :any;
  mensajesForo=[];
  estadoChat:boolean = false;
  chat: any ={};
  userinter :any = {};
  constructor(
    private chatService: ChatService,
    private clienteService : ClienteService,
    private router: Router){ 
      this.clienteService.autenticacion().subscribe((user)=>{
        this.userinter = user;
        console.log('usuario traido',this.userinter.uid)
        }); 
    }

  ngOnInit() {
    this.chat=this.chatService.chatForo;
    if(this.chat!=null){
      this.estadoChat=true;
    }else{
      this.router.navigate(['home']);
    }
    console.log('recupere el chat',this.chat);
    this.chatService.getForoRoom(this.chat.id).subscribe(room =>{
      console.log('room',room);   
      this.foro =room;
    })
  }
  enviarMensajeForo(){
    console.log('mensaje foro' ,this.msg)
    console.log('usuario completo',this.userinter)
    console.log('usuario nombre',this.userinter.displayName)
    console.log('usuario uid', this.userinter.uid)
    console.log('fecha', new Date().getTime())
    this.mensajeForo ={
      contenido: this.msg,
      nombreUsuario:this.userinter.displayName,
      uidUsuario: this.userinter.uid,
      fecha:new Date().getTime(),
      
    }
    this.chatService.enviarMensaje(this.mensajeForo,this.chat.id);
    this.msg=" "; 
  }
}
