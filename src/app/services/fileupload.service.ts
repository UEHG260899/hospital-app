import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



const baseUrl = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string
  ){
    try {
      
      const url = `${baseUrl}/upload/${tipo}/${id}`;

      const formData = new FormData();
      //Nombre de lo que se manda seguido del archivo o lo que se manda
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token' : localStorage.getItem('token') || ''
        },
        body : formData
      });

      const datos = await resp.json();

      if(datos.ok){
        return datos.nombreArchivo;
      }else{
        console.log(datos.msg);
        return false;
      }
      
    }catch(error){
      console.log(error);
      return false;
    }
  }
}
