import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnvioMaritimo } from '../../models/envioMaritimo.model';
import { EnvioMaritimoService } from 'src/app/services/envio-maritimo.service';
import { Puerto } from '../../models/puerto.model';
import { PuertoService } from 'src/app/services/puerto.service';

@Component({
  selector: 'app-envio-maritimo',
  templateUrl: './envio-maritimo.component.html',
  styleUrls: ['./envio-maritimo.component.css']
})
export class EnvioMaritimoComponent {
    
  listEnviosMaritimos: any[] = [];
  
  constructor(private fb: FormBuilder, private toastr: ToastrService, 
    private _envioMaritimoService: EnvioMaritimoService) {
    
  }

  ngOnInit(): void {
    this.getEnviosMaritimos();
  }  

  getEnviosMaritimos() {
    this._envioMaritimoService.getListEnviosMaritimos().subscribe(data => {
      console.log(data);
      this.listEnviosMaritimos = data;
    }, error => {
      console.log(error);
    })
  }  

  deleteEnvioMaritimo(id: number) {
    this._envioMaritimoService.deleteEnvioMaritimo(id).subscribe(data => {
      this.toastr.error('El envio maritimo fue eliminado con exito!!!', 'Envio Eliminado!');
      this.getEnviosMaritimos();
    }, error => {
      console.log(error);
    })
  }

 
}
