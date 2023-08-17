import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { BodegaComponent } from './components/bodega/bodega.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PuertoComponent } from './components/puerto/puerto.component';
import { EnvioComponent } from './components/envio/envio.component';
import { EnvioMaritimoComponent } from './components/envio-maritimo/envio-maritimo.component';
import { EnvioTerrestreComponent } from './components/envio-terrestre/envio-terrestre.component';

const routes: Routes = [

  {path:'cliente', component: ClienteComponent},
  {path:'producto', component: ProductoComponent},
  {path:'puerto', component: PuertoComponent},
  {path:'bodega', component: BodegaComponent},
  {path:'envio', component: EnvioComponent},
  {path:'envioMaritimo', component: EnvioMaritimoComponent},
  {path:'envioTerrestre', component: EnvioTerrestreComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'cliente'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
