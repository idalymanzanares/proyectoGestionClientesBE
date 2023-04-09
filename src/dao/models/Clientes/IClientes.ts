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