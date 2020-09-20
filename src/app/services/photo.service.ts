import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public fotos:photo[] = [];
  public ALMACEN_FOTOS:string = "Fotos";
  constructor() { }

  public async addNewToGallery() {
   
    // Hacer una foto
    const capturedPhoto = await Camera.getPhoto ({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });
    const fotoGuardada = await this.savePicture(capturedPhoto)
    this.fotos.unshift(fotoGuardada);
    Storage.set({
      key: this.ALMACEN_FOTOS,
      value: JSON.stringify(this.fotos.map(p => {
              // No guardar la representación base64 de los datos de las fotos, 
              // dado que ya ha sido guardado en el Filesystem
              const photoCopy = { ...p };
              delete photoCopy.base64;
    
              return photoCopy;
              }))
    });
  }
  public async savePicture(camera:CameraPhoto){
    // Convierte foto a formato base64, requerido por la API del sistema de archivos para guardar
    const base64Data = await this.readAsBase64(camera);
    // Escribe el archivo en el directorio de datos
    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
    // Obtener rutas de archivos de fotos específicas de la plataforma
    return await this.getPhotoFile(camera, fileName);
  }
  
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Obtener la foto, leer como un blob, luego convertir a formato base64
    const response = await fetch(cameraPhoto.webPath!);
   const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  private async getPhotoFile(cameraPhoto: CameraPhoto, 
    fileName: string): Promise<photo> {
    return {
      filepath: fileName,
      webviewpath: cameraPhoto.webPath
    };
  }
  public async loadSaved() {
    // Recuperar datos de array de fotos almacenados en caché
    const photos = await Storage.get({ key: this.ALMACEN_FOTOS });
    this.fotos = JSON.parse(photos.value) || [];
  
    // más por venir...
    // Mostrar la foto leyendo en formato base64
    for (let photo of this.fotos) {
      // Lee los datos de cada foto guardada en el sistema de ficheros
      const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data
      });

      // Plataforma web solamente: Guardar la foto en el campo base64
      photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
    }
  }
}

interface photo{
  filepath: string;
  webviewpath: string;
  base64?:string;
}
