import { ObjectId } from "mongodb";
import { IAuditable } from "../IAuditable";

export interface ICliente extends IAuditable{
    _id?: string| ObjectId;
    identidad: string;
    nombre: string;
    apellido: string;
    email: string;
    genero?: string;
    fechaNac?: Date;
    notas?: string;
}

export const DefaultCliente: ICliente = {
    identidad: "",
    nombre: "",
    apellido: "",
    email: "",
    createdAt: new Date(),
    updatedAt: new Date()
}

export class Cliente {
    private cliente: ICliente[];
   
    constructor(){
       this.cliente=[];
      
    }
    add(nuevoCliente : ICliente ) {
       const date= new Date();
       const nueva: ICliente = {
       ... nuevoCliente,
       _id: (Math.random()*1000).toString()+new Date().getTime().toString(),
       fechaNac: date
   
       }
       this.cliente.push(nueva)
       return this.update;
      }
      
      getAll(){
          return this.cliente;
      }
      update (updatecliente:ICliente){
        const newCliente:ICliente[] = this.cliente.map((emp)=>{
            if (emp._id === updatecliente._id ) {
                return {...emp, ...updatecliente, updated: new Date()};
            }
            return emp;
    
        });
        this.cliente = newCliente;
        return this.update;
    
        }
        delete(identidad: string){
           const clienteToDelete = this.cliente.find((emp)=>{
               return emp._id === identidad;
   
           });
           if(clienteToDelete){
            const newcliente: ICliente[] = this.cliente.filter((emp)=>{
                return emp._id! == identidad;

            });
            this.cliente =newcliente;
            return true;
     }
     return false;
    }
}