import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import {Cliente} from'../modelos/cliente';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from'firebase/app';
import {Router} from '@angular/router';
import { resolve } from 'url';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clientesColeccion:AngularFirestoreCollection<Cliente>;
  clienteDoc:AngularFirestoreDocument<Cliente>;
  clientes:Observable<Cliente[]>;
  clienteO =ClienteService;
  constructor (
    public db: AngularFirestore,
     private angularFireAuth:AngularFireAuth
     )
    {
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

   registrarUsuario(email: string, pass: string){
     return(new Promise((resolve,reject) => {
       this.angularFireAuth.auth.createUserWithEmailAndPassword(email,pass)
       .then(userData => resolve (userData),
       err => reject(err))
     }));
   }

   loginEmail(email:string, pass:string){
      return (new Promise((resolve,reject) => {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email,pass)
        .then(userData => resolve(userData),
        err => reject(err))
      }));
      
   }

   logOut(){
    return(this.angularFireAuth.auth.signOut());
   }

   loginFacebook(){
    return (this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()));
   }

   loginGoogle(){
   return(this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
   }
   
   autenticacion(){
    return (this.angularFireAuth.authState.pipe(map(auth => auth)));
   }

   getClientes(){
     return(this.clientes);
   }

   addClientes(cliente: Cliente){
    return(new Promise((resolve,reject) => {
      this.clientesColeccion.add(cliente)
      .then(userData => resolve (userData),
      err => reject(err))
    }));
    //this.actualizarCliente(cliente);
   }

  deleteClientes(cliente: Cliente){
      this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
      this.clienteDoc.delete();
   }
   actualizarDatosInicio(cliente: Cliente){
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    const datos = {
      email : cliente.email,
      photoURL : cliente.photoURL,
      displayName : cliente.displayName
    };
    this.clienteDoc.set(datos);
   }
   actualizarCliente(cliente: Cliente){
     this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
     this.clienteDoc.update(cliente);
   }

}
