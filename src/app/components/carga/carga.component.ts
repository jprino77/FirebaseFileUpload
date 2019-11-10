import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreelemento = false;
  archivos: FileItem[] = [];
  constructor(private cargaImagenesService: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {

    this.cargaImagenesService.cargarImagenesFirebase(this.archivos);

  }

  limpiarImagenes(){
    this.archivos = [];
  }

}
