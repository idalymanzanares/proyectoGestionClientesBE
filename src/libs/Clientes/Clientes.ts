import { ICliente } from "@server/dao/models/Clientes/IClientes";
import { IDataAccessObject } from "@server/dao/IDataAccessObject";
import { ClientesDao } from "@server/dao/models/Clientes/ClientesDao";

export class Clientes {
    private ClientesDao: ClientesDao;
    constructor(cliente: IDataAccessObject){
        this.ClientesDao = cliente as ClientesDao;
    }
    getAll() {
        return this.ClientesDao.findAll();
    }
    getById(id: string) {
        return this.ClientesDao.findByID(id);
    }
    add(nuevoCliente: ICliente) {
        const date = new Date();
        const nuevo: ICliente = {
            ...nuevoCliente,
            createdAt: date,
            updatedAt: date
        }
        return this.ClientesDao.create(nuevo);
    }
    update(id: string, updateCliente: ICliente) {
        const updateObject = { ...updateCliente, updatedAt: new Date() };
        return this.ClientesDao.update(id, updateObject);
    }
    delete(id: string){
        return this.ClientesDao.delete(id);
    }
}