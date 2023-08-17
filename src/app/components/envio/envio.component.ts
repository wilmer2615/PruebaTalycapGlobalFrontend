import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { EnvioService } from 'src/app/services/envio.service';
import { ProductoService } from 'src/app/services/producto.service';
import { BodegaService } from 'src/app/services/bodega.service';
import { PuertoService } from 'src/app/services/puerto.service';
import '@angular/localize/init';


@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css'],
})
export class EnvioComponent {
  
  model: any;
  listEnvios: any[] = [];
  listPuertos: any[] = [];
  listBodegas: any[] = [];
  listProductos:any[] = [];
  listClientes: any[] = []; 
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService, 
    private _envioService: EnvioService,
    private _clienteService: ClienteService,
    private _productoService: ProductoService, 
    private _bodegaService: BodegaService,
    private _puertoService: PuertoService,) 
    {
    this.form = this.fb.group({
      producto: ['', Validators.required],
      cantidadProducto: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      precioEnvio: ['', Validators.required],
      numeroGuia: ['', Validators.required],
      cliente: ['', Validators.required],
      maritimo: [false,],
      terrestre: [false,],
      nombreBodega: ['0',],
      placaVehiculo: ['',],
      nombrePuerto: ['0',],
      numeroFlota: ['',],

    })
  }

  ngOnInit(): void {
    this.getEnvios();
    this.getProductos();
    this.getClientes();
    this.getBodegas();
    this.getPuertos();

  }

  saveEnvio() {    
    const envio: any = {
      idProducto: this.form.get('producto')?.value,
      cantidadProducto: this.form.get('cantidadProducto')?.value,
      FechaEntrega: new Date(this.form.get('fechaEntrega')?.value.year, (this.form.get('fechaEntrega')?.value.month-1), this.form.get('fechaEntrega')?.value.day),
      precioEnvio: this.form.get('precioEnvio')?.value,
      numeroGuia: this.form.get('numeroGuia')?.value,
      idCliente: this.form.get('cliente')?.value,
      maritimo: ((this.form.get('maritimo')?.value)==null)?false:this.form.get('maritimo')?.value,
      terrestre: ((this.form.get('terrestre')?.value)==null)?false:this.form.get('terrestre')?.value,
      idBodega: (this.form.get('nombreBodega')?.value)==null?0:this.form.get('nombreBodega')?.value,
      placaVehiculo: this.form.get('placaVehiculo')?.value,
      idPuerto: (this.form.get('nombrePuerto')?.value)==null?0:this.form.get('nombrePuerto')?.value,
      numeroFlota: this.form.get('numeroFlota')?.value,
    }

    if (this.id == undefined) {
      // Agragamos nuevo cliente 
      this._envioService.saveEnvio(envio).subscribe(data => {
        this.toastr.success('El envio fue registrado con exito!!!', 'Envio Registrado!');
        this.getEnvios();
        this.form.reset();
      }, error => {
        this.toastr.error("Uppsss, Ocurrio un error", "Error");
        console.log(error);
      });

    } else {
      //Editamos cliente
      envio.id = this.id;
      
      this._envioService.updateEnvio(this.id, envio).subscribe(data => {
        this.form.reset();
        this.id = undefined;
        this.toastr.info('El envio fue actualizado con exito!!!', 'Envio Actualizado!');
        this.getEnvios();
      }, error => {
        console.log(error);
      })
    }
  }

  getEnvios() {
    this._envioService.getListEnvios().subscribe(data => {
      this.listEnvios = data;
    }, error => {
      console.log(error);
    })
  }

  editEnvio(envio: any) {

    this.id = envio.id;

    this.form.patchValue({
      nombre: envio.nombre,
      direccion: envio.direccion,
      numeroIdentificacion: envio.numeroIdentificacion,
      email: envio.email
    })

  }

  deleteEnvio(id: number) {
    this._envioService.deleteEnvio(id).subscribe(data => {
      this.toastr.error('El envio fue eliminado con exito!!!', 'Envio Eliminado!');
      this.getEnvios();
    }, error => {
      console.log(error);
    })
  }
  getProductos() {
    this._productoService.getListProductos().subscribe(data => {
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  getClientes() {
    this._clienteService.getListClientes().subscribe(data => {
      this.listClientes = data;
    }, error => {
      console.log(error);
    })
  }

  getBodegas() {
    this._bodegaService.getListBodegas().subscribe(data => {
      this.listBodegas = data;
    }, error => {
      console.log(error);
    })
  }

  getPuertos() {
    this._puertoService.getListPuertos().subscribe(data => {
      this.listPuertos = data;
    }, error => {
      console.log(error);
    })
  }
}
