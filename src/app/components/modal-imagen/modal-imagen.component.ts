import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


import { FileuploadService } from 'src/app/services/fileupload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubida!: File;
  public imgTemp: any = '';

  constructor(public modalService: ModalImagenService,
    public fileUploadService: FileuploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalService.cerrarModal();
  }

  cambiarImagen(event: any) {
    let imagen = event.target.files[0];

    this.imagenSubida = imagen;

    if (!imagen) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imagen);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    return;
  }

  subirImagen() {

    const id = this.modalService.id;
    const tipo = this.modalService.tipo;
    this.fileUploadService.actualizarFoto(this.imagenSubida, tipo , id)
      .then((img) => {
        Swal.fire('Guardado', 'La imagen se cargo correctamente', 'success');
        this.modalService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
