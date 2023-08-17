import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  listClientes: any[] = [];
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private _clienteService: ClienteService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      email: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.getClientes();
  }

  saveCliente() {

    const cliente: any = {
      nombre: this.form.get('nombre')?.value,
      direccion: this.form.get('direccion')?.value,
      numeroIdentificacion: this.form.get('numeroIdentificacion')?.value,
      email: this.form.get('email')?.value
    }

    if (this.id == undefined) {
      // Agragamos nuevo cliente 
      this._clienteService.saveCliente(cliente).subscribe(data => {
        this.toastr.success('El cliente fue registrado con exito!!!', 'Cliente Registrado!');
        this.getClientes();
        this.form.reset();
      }, error => {
        this.toastr.error("Uppsss, Ocurrio un error", "Error");
        console.log(error);
      });

    } else {
      //Editamos cliente
      cliente.id = this.id;
      
      this._clienteService.updateCliente(this.id, cliente).subscribe(data => {
        this.form.reset();
        this.id = undefined;
        this.toastr.info('El cliente fue actualizado con exito!!!', 'Cliente Actualizado!');
        this.getClientes();
      }, error => {
        console.log(error);
      })
    }
  }

  getClientes() {
    this._clienteService.getListClientes().subscribe(data => {
      console.log(data);
      this.listClientes = data;
    }, error => {
      console.log(error);
    })
  }

  editCliente(cliente: Cliente) {

    this.id = cliente.id;

    this.form.patchValue({
      nombre: cliente.nombre,
      direccion: cliente.direccion,
      numeroIdentificacion: cliente.numeroIdentificacion,
      email: cliente.email
    })

  }

  deleteCliente(id: number) {
    this._clienteService.deleteCliente(id).subscribe(data => {
      this.toastr.error('El cliente fue eliminado con exito!!!', 'Cliente Eliminado!');
      this.getClientes();
    }, error => {
      console.log(error);
    })
  }
}
