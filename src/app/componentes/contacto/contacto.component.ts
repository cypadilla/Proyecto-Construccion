import { Component, OnInit } from '@angular/core';
import {Contacto} from '../../modelos/cliente';
import {ClienteService} from '../../services/cliente.service';
import {NgForm} from '@angular/forms'
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  
  contacto = {} as Contacto;

  constructor(public clienteService: ClienteService) { }

  ngOnInit() {
  }

    Contacto(){
    console.log('Contacto info',this.contacto)
    this.clienteService.añadirContacto(this.contacto);
    this.contacto={}
  }
}
