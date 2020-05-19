import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ClienteService } from '../services/cliente.service';
import { Mensaje } from '../modelos/mensaje';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private chatsCollection: AngularFirestoreCollection<Mensaje>;
  public usuario: any = {};
  public chats: Mensaje[] = [];
 
  constructor(private angularFireStore: AngularFirestore,
              private clienteService: ClienteService) {

            this.clienteService.autenticacion().subscribe( user => {
              console.log('Estado Usuario', user);

              if(!user){
                return;
              }

              this.usuario.nombre = user.displayName;
              this.usuario.uid = user.uid; 

            })

              }

  cargarMensajes(){
    this.chatsCollection = this.angularFireStore.collection<Mensaje>('chats', ref => ref.orderBy('fecha','asc').limit(100));
    
    return (this.chatsCollection.valueChanges(map((mensajes:Mensaje[]) => {
      console.log('mensajes',mensajes);
      this.chats =[];
      for (let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
      
    })));
  }

  agregarMensaje(texto: string){
    let mensaje :Mensaje = {
      nombre:'CristianPrueba',
      mensaje:texto,
      fecha: new Date().getTime()
    }
    return (this.chatsCollection.add(mensaje));
  }

  logOut(){
    this.usuario={};
  }
}
