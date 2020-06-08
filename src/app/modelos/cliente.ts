export interface Roles{
  admin?:boolean;
  residente?:boolean;
}
export interface Cliente{
  photoURL?:string;
  id?:string;
  displayName?:string;
  nombre?: string;
  apellido?: string;
  edad?: number;
  email?: string;
  password?:string; 
  direccion?:string;
  identificacion?: string;
  propietario?:string;
  torre?:string;
  apartamento?:string;
  roles?:Roles;
}

export interface Contacto{
  nombre?:string;
  telefono?:string;
  email?:string;
  asunto?:string;
  mensaje?:string;
}