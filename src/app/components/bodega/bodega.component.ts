import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Bodega } from 'src/app/models/bodega.model';
import { BodegaService } from 'src/app/services/bodega.service';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.css']
})
export class BodegaComponent {

  listBodegas: any[] = [];
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private _bodegaService: BodegaService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],

    })
  }

  ngOnInit(): void {
    this.getBodegas();
  }

  saveBodega() {

    const bodega: any = {
      nombre: this.form.get('nombre')?.value,
      direccion: this.form.get('direccion')?.value
    }

    if (this.id == undefined) {
      // Agragamos nueva bodega 
      this._bodegaService.saveBodega(bodega).subscribe(data => {
        this.toastr.success('La bodega fue registrada con exito!!!', 'Bodega Registrada!');
        this.getBodegas();
        this.form.reset();
      }, error => {
        this.toastr.error("Uppsss, Ocurrio un error", "Error");
        console.log(error);
      });

    } else {
      //Editamos bodega
      bodega.id = this.id;

      this._bodegaService.updateBodega(this.id, bodega).subscribe(data => {
        this.form.reset();
        this.id = undefined;
        this.toastr.info('La bodega fue actualizada con exito!!!', 'Bodega Actualizada!');
        this.getBodegas();
      }, error => {
        console.log(error);
      })
    }
  }

  getBodegas() {
    this._bodegaService.getListBodegas().subscribe(data => {
      console.log(data);
      this.listBodegas = data;
    }, error => {
      console.log(error);
    })
  }

  editBodega(bodega: Bodega) {

    this.id = bodega.id;

    this.form.patchValue({
      nombre: bodega.nombre,
      direccion: bodega.direccion
    })

  }

  deleteBodega(id: number) {
    this._bodegaService.deleteBodega(id).subscribe(data => {
      this.toastr.error('La bodega fue eliminada con exito!!!', 'Bodega Eliminada!');
      this.getBodegas();
    }, error => {
      console.log(error);
    })
  }
}
