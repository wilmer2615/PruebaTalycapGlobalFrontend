import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  
  listProductos: any[] = [];
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private _productoService: ProductoService) {
    this.form = this.fb.group({
      tipoProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.getProductos();
  }

  saveProducto() {

    const producto: any = {
      tipoProducto: this.form.get('tipoProducto')?.value,
      descripcionProducto: this.form.get('descripcionProducto')?.value
    }

    if (this.id == undefined) {
      // Agragamos nuevo producto 
      this._productoService.saveProducto(producto).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!!!', 'Producto Registrado!');
        this.getProductos();
        this.form.reset();
      }, error => {
        this.toastr.error("Uppsss, Ocurrio un error", "Error");
        console.log(error);
      });

    } else {
      //Editamos producto
      producto.id = this.id;
      
      this._productoService.updateProducto(this.id, producto).subscribe(data => {
        this.form.reset();
        this.id = undefined;
        this.toastr.info('El producto fue actualizado con exito!!!', 'Producto Actualizado!');
        this.getProductos();
      }, error => {
        console.log(error);
      })
    }
  }

  getProductos() {
    this._productoService.getListProductos().subscribe(data => {
      this.listProductos = data;
    }, error => {
      console.log(error);
    })
  }

  editProducto(producto: Producto) {

    this.id = producto.id;

    this.form.patchValue({
      tipoProducto: producto.tipoProducto,
      descripcionProducto: producto.descripcionProducto
    })

  }

  deleteProducto(id: number) {
    this._productoService.deleteProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado con exito!!!', 'Producto Eliminado!');
      this.getProductos();
    }, error => {
      console.log(error);
    })
  }
}
