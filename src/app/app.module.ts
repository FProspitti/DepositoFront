import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import {ValidateService} from "./services/validate.service";
import {AuthService} from "./services/auth.service";
import {FlashMessagesModule} from "angular2-flash-messages";
import {ToastModule} from 'primeng/toast';
import {AuthGuard} from "./guards/auth.guard";
import { UsersComponent } from './components/users/users.component';
import {DataTableModule, SharedModule} from 'primeng/primeng';
import {DialogModule} from "primeng/primeng";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import {ContextMenuModule} from "primeng/primeng";
import { ClientesComponent } from './components/clientes/clientes.component';
import { EstadosComponent } from './components/estados/estados.component';
import {PanelModule} from 'primeng/panel';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import { ConsultaMovimientoComponent } from './components/movimientos/consulta-movimiento/consulta-movimiento.component';
import { EntradaSalidaMovimientoComponent } from './components/movimientos/entrada-salida-movimiento/entrada-salida-movimiento.component';
import {NuevoMovimientoComponent} from './components/movimientos/nuevo-movimiento/nuevo-movimiento.component';
import { QRCodeModule } from 'ng-qrcode';
import { NgxBarcodeModule } from 'ngx-barcode';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ClientesService} from './services/clientes.service';
import {EstadosService} from './services/estados.service';
import {MovimientosService} from './services/movimientos.service';
import {CaracteristicasService} from './services/caracteristicas.service';
import {SecurityInterceptor} from './interceptors/security.interceptor';


const  appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'entradaSalida', component: EntradaSalidaMovimientoComponent, canActivate:[AuthGuard]},
  {path: 'clientes', component: ClientesComponent, canActivate:[AuthGuard]},
  {path: 'estados', component: EstadosComponent, canActivate:[AuthGuard]},
  {path: 'consultaMovimiento', component: ConsultaMovimientoComponent, canActivate:[AuthGuard]},
  {path: 'nuevoMovimiento', component: NuevoMovimientoComponent, canActivate:[AuthGuard]},
  {path: 'caracteristicas', component: CaracteristicasComponent, canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    UsersComponent,
    ClientesComponent,
    EstadosComponent,
    MovimientosComponent,
    ConsultaMovimientoComponent,
    EntradaSalidaMovimientoComponent,
    NuevoMovimientoComponent,
    CaracteristicasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    DataTableModule,
    SharedModule,
    DialogModule,
    ToastModule,
    PanelModule,
    DropdownModule,
    BrowserAnimationsModule,
    ButtonModule,
    ContextMenuModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    CalendarModule,
    TableModule,
    HttpClientModule,
    QRCodeModule,
    NgxBarcodeModule,
    MessagesModule,
    MessageModule,
    KeyFilterModule

  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    ClientesService,
    EstadosService,
    MovimientosService,
    CaracteristicasService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:  SecurityInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
