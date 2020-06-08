export interface Mensaje {
    nombre:string; 
    mensaje:string;
    fecha?:number;
    uid?:string;  
}
export interface MensajeForo{
    nombreUsuario?:string; 
    contenido?:string;
    fecha?:number;
    uidUsuario?:string; 
}
export interface Chat {
    nombre?:string;
    descripcion?:string;
    fecha?:string;
    id?:string;
    nombreUsuario?:string;
    usuarioUid?:string;
}           