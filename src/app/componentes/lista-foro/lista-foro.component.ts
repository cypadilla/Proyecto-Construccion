import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import {Router} from '@angular/router';
import { MensajeForo,Chat } from '../../modelos/mensaje';
import {NgForm} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-lista-foro',
  templateUrl: './lista-foro.component.html',
  styleUrls: ['./lista-foro.component.css']
})
export class ListaForoComponent implements OnInit {
  foros=[];
  confirmacion:boolean;
  Foro= {} as Chat;
  foroEditar= {} as Chat;
  constructor(private chatService: ChatService,
    private router: Router,
    private modal:NgbModal) { }

  ngOnInit() {
    this.getForos()
  }

  getForos(){
    this.chatService.getForos().subscribe((Foros)=>{
    this.foros=Foros;
    console.log(this.foros)
    })
  }
  eliminarForo(foro:Chat){
     this.confirmacion = confirm('¿Seguro de que deseas eliminar este libro?')
    if(this.confirmacion){
      console.log('Foro eliminado: ',foro.nombre)
      this.chatService.eliminarForo(foro);
    }else{
      console.log('foro no eliminado')
    }
  }
  editarForo(foro:Chat){
    console.log('FORO',foro)
    this.foroEditar=foro;
    this.chatService.editarForo(this.foroEditar)
    this.foroEditar={}
  }
  guardarForo(){
    this.chatService.añadirForo(this.Foro);
    console.log('guardaro',this.Foro)
    this.Foro={}
  }
  openSM(contenido){
    this.modal.open(contenido,{size:'xl'});
  }
}
