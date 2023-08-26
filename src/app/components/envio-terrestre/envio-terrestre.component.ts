import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnvioTerrestreService } from 'src/app/services/envio-terrestre.service';

@Component({
  selector: 'app-envio-terrestre',
  templateUrl: './envio-terrestre.component.html',
  styleUrls: ['./envio-terrestre.component.css']
})
export class EnvioTerrestreComponent {
  
  listEnviosTerrestres: any[] = [];

  constructor(private fb: FormBuilder, private toastr: ToastrService, 
    private _envioTerrestreService: EnvioTerrestreService) {
    
  }

  ngOnInit(): void {
    this.getEnviosTerrestres();
  }  

  getEnviosTerrestres() {
    this._envioTerrestreService.getListEnviosTerrestres().subscribe(data => {
      console.log(data);
      this.listEnviosTerrestres = data;
    }, error => {
      console.log(error);
    })
  }   

  deleteEnvioTerrestre(id: number) {
    this._envioTerrestreService.deleteEnvioTerrestre(id).subscribe(data => {
      this.toastr.error('El envio terrestre fue eliminado con exito!!!', 'Envio Eliminado!  ');
      this.getEnviosTerrestres();
    }, error => {
      console.log(error);
    })
  }
}
