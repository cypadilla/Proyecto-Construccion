import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import {Cliente} from'../modelos/cliente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientesColeccion:AngularFirestoreCollection<Cliente>;
  clienteDoc:AngularFirestoreDocument<Cliente>;
  clientes:Observable<Cliente[]>;
  clienteO =ClienteService;
  constructor (public db: AngularFirestore) {
    //this.clientes = db.collection('clientes').valueChanges();
    this.clientesColeccion = this.db.collection('clientes');
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(map(
      actions => {
      return actions.map(a => {
      const data = a.payload.doc.data() as Cliente;
      data.id = a.payload.doc.id;
      return data;
      })

    }));
   }

   getClientes(){
     return(this.clientes);
   }
   addClientes(cliente: Cliente){
    this.clientesColeccion.add(cliente);
   }
     deleteClientes(cliente: Cliente){
      this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
      this.clienteDoc.delete();
     }

   actualizarCliente(cliente: Cliente){
     this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
     this.clienteDoc.update(cliente);
   }

}
