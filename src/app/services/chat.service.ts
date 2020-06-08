import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ClienteService } from '../services/cliente.service';
import { Mensaje,Chat,MensajeForo } from '../modelos/mensaje';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { Action } from 'rxjs/internal/scheduler/Action';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  MensajeCollection: AngularFirestoreCollection<Mensaje>;
  chatCollection: AngularFirestoreCollection<Chat>;
  chatDoc: AngularFirestoreDocument<Chat>;
  chat:Observable<Chat[]>;
  public usuario: any = {};
  public chats: Mensaje[] = [];
  chatForo: Chat;
  
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

  getForos(){

    this.chatCollection = this.angularFireStore.collection('Foros');
    return(this.chat = this.chatCollection.snapshotChanges().pipe(map(
      actions => {
      return actions.map(a => {
      const data = a.payload.doc.data() as Chat;
      data.id = a.payload.doc.id;
      return data;
      });
    })));
  }
  cargarMensajes(){
    this.MensajeCollection = this.angularFireStore.collection<Mensaje>('chats', ref => ref.orderBy('fecha','asc').limit(100));
    //db.collection("app").document("users").collection(uid).document("notifications")
    return (this.MensajeCollection.valueChanges(map((mensajes:Mensaje[]) => {
      console.log('mensajes',mensajes);
      this.chats =[];
      for (let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
      
    })));
  }

  agregarMensaje(texto: string){
    let mensaje :Mensaje = {
      nombre:this.usuario.nombre,
      mensaje:texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid

    }
    return (this.MensajeCollection.add(mensaje));
  }

  datosForo(chat){
    this.chatForo=chat;
  }

  getDatosForo(){
   return(this.chatForo)
  }
  getForoRoom(chat_id:string){
   return(this.angularFireStore.doc<Chat>(`Foros/${chat_id}`).snapshotChanges().pipe(map(action =>{
     if(action.payload.exists === false){
       return null;
     } else {
       const data = action.payload.data() as Chat;
       data.id =action.payload.id;
       return data;
     }
   })));
  }
  enviarMensaje(mensaje : MensajeForo, chat_id: string){  
    this.angularFireStore.collection('Foros').doc(chat_id).update({
      mensajes:firestore.FieldValue.arrayUnion(mensaje),
    })
  }

  añadirForo(Foro:Chat){
    this.chatCollection.add(Foro)
  }
  editarForo(Foro:Chat){
    this.chatDoc = this.angularFireStore.doc<Chat>(`Foros/${Foro.id}`)
    this.chatDoc.update(Foro)
  }

  eliminarForo(Foro:Chat){
    this.chatDoc = this.angularFireStore.doc<Chat>(`Foros/${Foro.id}`)
    this.chatDoc.delete();
  }
  logOut(){
    this.usuario={};
  }
}
