import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


//Rutas
import { AppRoutingModule } from './app-routing.module';




//Components
import { AppComponent } from './app.component';
import { BodegaComponent } from './components/bodega/bodega.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EnvioComponent } from './components/envio/envio.component';
import { EnvioMaritimoComponent } from './components/envio-maritimo/envio-maritimo.component';
import { EnvioTerrestreComponent } from './components/envio-terrestre/envio-terrestre.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PuertoComponent } from './components/puerto/puerto.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        AppComponent,
        BodegaComponent,
        ClienteComponent,
        EnvioComponent,
        EnvioMaritimoComponent,
        EnvioTerrestreComponent,
        ProductoComponent,
        PuertoComponent,
        NavbarComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        CommonModule,
        NgbModule,
    ]
})
export class AppModule { }
