import { MongoDAOBase } from "@server/dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { DefaultCliente, ICliente } from "./IClientes";

export class ClientesDao extends MongoDAOBase<ICliente> {
    constructor(conexion: IDBConnection){
        super("clientes", conexion);
    }
    public async create( cliente: Partial<ICliente>){
        const newCliente = {...DefaultCliente, ...cliente};
        return super.create(newCliente);
    }


}