import { Component, OnInit } from '@angular/core';
import { Cliente } from'../../modelos/cliente';
import {NgForm} from '@angular/forms';
import {AngularFireAuth} from'angularfire2/auth';
import * as firebase from'firebase/app';
import {Router} from '@angular/router';
import{ClienteService} from'../../services/cliente.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email:string;
  private pass: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private clienteService:ClienteService
    ) { }

  ngOnInit() {
  }

  loginEmail(){
    this.clienteService.loginEmail(this.email,this.pass)
    .then((usuario)=>{
      console.log('usuario con correo electronico',usuario);
      this.redireccionLogin();
    }).catch((error)=>{
      console.error('Error en el login con usuario',error.messsage);
    }); 
  }

  loginFacebook(){
    //this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    this.clienteService.loginFacebook()
    .then((usuario)=>{
      console.log('usuarioFacebook',usuario);
      this.redireccionLogin();
    }).catch((error)=>{
      console.error('Error en el login con facebook',error.message);
    });
    
  }
  loginGoogle(){
    this.clienteService.loginGoogle()
    .then((usuario)=>{
      console.log('usuario', usuario);
      this.redireccionLogin();
    }).catch((error)=>{
      console.log('error',error.message);
    });
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  redireccionLogin(){
    this.router.navigate(['home']);
  }
  logOut(){
    this.clienteService.logOut();
    this.redireccionLogin();
  }
  
 
}
