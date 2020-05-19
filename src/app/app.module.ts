import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClienteFormularioComponent } from './componentes/cliente-formulario/cliente-formulario.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import {RouterModule ,Routes} from '@angular/router';
import { LoginComponent } from "./componentes/login/login.component";
import {AngularFireAuth} from 'angularfire2/auth';
import { HomeComponent } from './componentes/home/home.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PerfilClienteComponent } from './componentes/perfil-cliente/perfil-cliente.component';
import { AngularFireStorageModule} from 'angularfire2/storage';
import { ChatComponent } from './componentes/chat/chat.component';

const routes: Routes = [
  {path:  '',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'cliente-formulario',component: ClienteFormularioComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'perfilCliente',component:PerfilClienteComponent},
  {path:'chat',component:ChatComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ClienteFormularioComponent,
    ClientesComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    PerfilClienteComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AngularFireStorageModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
