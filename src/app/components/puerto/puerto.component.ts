import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Puerto } from 'src/app/models/puerto.model';
import { PuertoService } from 'src/app/services/puerto.service';

@Component({
  selector: 'app-puerto',
  templateUrl: './puerto.component.html',
  styleUrls: ['./puerto.component.css']
})
export class PuertoComponent {
    
  listPuertos: any[] = [];
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private _puertoService: PuertoService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.getPuertos();
  }

  savePuerto() {

    const puerto: any = {
      nombre: this.form.get('nombre')?.value,
      ubicacion: this.form.get('ubicacion')?.value
    }

    if (this.id == undefined) {
      // Agragamos nuevo puerto 
      this._puertoService.savePuerto(puerto).subscribe(data => {
        this.toastr.success('El puerto fue registrado con exito!!!', 'Puerto Registrado!');
        this.getPuertos();
        this.form.reset();
      }, error => {
        this.toastr.error("Uppsss, Ocurrio un error", "Error");
        console.log(error);
      });

    } else {
      //Editamos puerto
      puerto.id = this.id;
      
      this._puertoService.updatePuerto(this.id, puerto).subscribe(data => {
        this.form.reset();
        this.id = undefined;
        this.toastr.info('El puerto fue actualizado con exito!!!', 'Puerto Actualizado!');
        this.getPuertos();
      }, error => {
        console.log(error);
      })
    }
  }

  getPuertos() {
    this._puertoService.getListPuertos().subscribe(data => {
      this.listPuertos = data;
    }, error => {
      console.log(error);
    })
  }

  editPuerto(puerto: Puerto) {

    this.id = puerto.id;

    this.form.patchValue({
      nombre: puerto.nombre,
      ubicacion: puerto.ubicacion
    })

  }

  deletePuerto(id: number) {
    this._puertoService.deletePuerto(id).subscribe(data => {
      this.toastr.error('El puerto fue eliminado con exito!!!', 'Puerto Eliminado!');
      this.getPuertos();
    }, error => {
      console.log(error);
    })
  }
}
