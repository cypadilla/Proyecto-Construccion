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


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch: 'full'},
  {path:'cliente-formulario',component: ClienteFormularioComponent},
  {path:'clientes',component:ClientesComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ClienteFormularioComponent,
    ClientesComponent,
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
