import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente,Roles } from '../../modelos/cliente'
import {NgForm} from '@angular/forms'
import {Router} from '@angular/router';
import {AngularFireAuth} from'angularfire2/auth';
import {AngularFireStorage} from 'angularfire2/storage';
import { finalize } from 'rxjs/operators'; 
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-cliente-formulario',
  templateUrl: './cliente-formulario.component.html',
  styleUrls: ['./cliente-formulario.component.css']
})
export class ClienteFormularioComponent implements OnInit {
  roles={}as Roles;
  cliente = {} as Cliente;
  nombreUsuario :string ="pepito"; 
  id_usuario:any;
  id_user:string="";
  constructor(
    public clienteService: ClienteService,
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFireStorage: AngularFireStorage
  ) { }

    porcentajeBarraProgreso: Observable<number>;
    urlImagen: Observable<string>; 


    @ViewChild('imagenUrl',{static:true}) inputImageUser: ElementRef;
  
  ngOnInit() {
  }
  /*crearCliente(){
    this.clienteService.registrarUsuario(this.email,this.pass)
    .then((usuario) => {
      this.router.navigate(['home']);
    }).catch(err => console.error('error',err));
  }*/
  actualizarDatosInicio(){
   this.clienteService.actualizarDatosInicio(this.cliente)
  }
  subirImagen(event){
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `upload/imagenPerfil${id}`;
    const ref = this.angularFireStorage.ref(filePath);
    const task = this.angularFireStorage.upload(filePath,file)
    console.log("evento",event.target.files[0]);
    this.porcentajeBarraProgreso = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(()=> this.urlImagen = ref.getDownloadURL())).subscribe();
    
  }
  
  addClientes(){

    this.clienteService.registrarUsuario(this.cliente.email,this.cliente.password)
    .then((res)=>{
      console.log('USUARIO',res)
      if(res){console.log("Usuario registrado correctamente")}
    }).catch((error)=>{console.error('error registro',error)}); 
    console.log('nombre usuario',this.cliente.displayName)
    let rol:Roles;
    if(this.roles.admin==true&&this.roles.residente==true){
      rol={
        admin:true,
        residente:true
      }
    }
    if(this.roles.residente==false&&this.roles.admin==false){
      rol={
        residente:false,
        admin:false,
      }
    }
    if(this.roles.residente==false&&this.roles.admin==true){
      rol={
        residente:false,
        admin:true,
      }
    }
    if(this.roles.residente==true&&this.roles.admin==false){
      rol={
        residente:true,
        admin:false,
      }
    }
    this.cliente.roles=rol;
    this.clienteService.addClientes(this.cliente)
    .then((res)=>{
      this.clienteService.autenticacion().subscribe(estado =>{
        if(estado){
          estado.updateProfile({
           photoURL:this.inputImageUser.nativeElement.value,
           displayName:this.nombreUsuario
          }).then(()=>{
            if(res){console.log("Usuario Creado correctamente",estado)}
            this.router.navigate(['perfilCliente']);
          }).catch((error)=>console.log('error',error.message));
        }
      });     
    }).catch((error)=>{console.error(error)});

     
    //this.actualizarDatosInicio()
    console.log(this.cliente);
    this.cliente ={} as Cliente;
  }
}
