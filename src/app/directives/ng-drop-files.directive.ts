import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  @Input() archivos: FileItem[] = [];

  constructor() {}

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);

    this.mouseSobre.emit(false);
  }

  // para extender la compativilidad
  private _getTransferencia(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {

    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];

      if (this._archivoPuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);

        console.log(nuevoArchivo);
        this.archivos.push( nuevoArchivo);
      }


    }
  }

  private _archivoPuedeSerCargado(archivo: File): boolean {
    console.log(archivo)
    if (!this._archivoYaDropeado(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }
  // previene que se abra la imagen en el explorador
  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaDropeado(nombreArchivo): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya esta agregado');
        return true;
      }
    }

    return false;
  }

  private _esImagen(tipoArchivo: string): boolean {
    console.log(tipoArchivo.startsWith('image'))
    return tipoArchivo === '' || tipoArchivo === undefined
      ? false
      : tipoArchivo.startsWith('image');
  }
}
