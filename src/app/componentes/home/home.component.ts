import { Component, OnInit } from '@angular/core';
import { ChatService } from'../../services/chat.service';
import { Chat } from '../../modelos/mensaje';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public foros: any =[];

  constructor(private chatService: ChatService,private router: Router) { }

  ngOnInit() {
    this.chatService.getForos().subscribe( chat => {
    this.foros=chat;
    })

      }

  ingresarForo(chat){
    console.log(chat);
    this.chatService.chatForo=chat;
    //this.chatService.datosForo(chat);
    this.router.navigate([`foro/:${chat.id}`]);   
}
}
