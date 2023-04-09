import express from 'express';
const router = express.Router();
import { ClientesDao } from '@server/dao/models/Clientes/ClientesDao';
import { MongoDBConn } from '@server/dao/MongoDBConn';
import { ICliente } from '@server/dao/models/Clientes/IClientes';
import { Clientes } from '@server/libs/Clientes/Clientes';

const clientesDao = new ClientesDao(MongoDBConn);
let clientesModel: Clientes;
clientesDao.init().then(() => {
  clientesModel = new Clientes(clientesDao);
});

router.get('/', (_req, res) => {
  const jsonUrls = {
    getAll: { method: 'get', url: 'clientes/all' },
    getById: { method: 'get', url: 'clientes/byid/:id' },
    new: { method: 'post', url: 'clientes/new' },
    update: { method: 'put', url: 'clientes/upd/:id' },
    delete: { method: 'delete', url: 'clientes/del/:id' },
  };
  res.status(200).json(jsonUrls);
});

router.get('/all', async (_req, res) => {
  res.status(200).json(await clientesModel.getAll());
});

router.get('/byid/:id', async (req, res) => {
  const { id: codigo } = req.params;
  const cliente = await clientesModel.getById(codigo);
  if (cliente) {
    return res.status(200).json(cliente);
  }
  return res
    .status(404)
    .json({ error: 'No se encontró el cliente solicitado' });
});

router.post('/new', async (req, res) => {
  const date = new Date();
  const {
    identidad = 'NA',
    nombre = 'NA',
    apellido = 'NA',
    email = 'NA',
    genero = '',
    fechaNac = date,
    notas = '',
  } = req.body;

  if (
    identidad === 'NA' ||
    nombre === 'NA' ||
    apellido === 'NA' ||
    email === 'NA'
  ) {
    return res.status(403).json({
      error:
        'Debe ingresar su identidad, nombre, apellido y correo electronico',
    });
  }

  const newCliente: ICliente = {
    identidad,
    nombre,
    apellido,
    email,
    genero,
    fechaNac,
    notas,
    createdAt: date,
    updatedAt: date,
  };
  if (await clientesModel.add(newCliente)) {
    return res.status(200).json({ created: true });
  }
  return res.status(404).json({ error: 'Error al agregar un nuevo cliente' });
});

router.put('/upd/:id', async (req, res) => {
  const date = new Date();
  const { id } = req.params;
  const {
    identidad = 'NA',
    nombre = 'NA',
    apellido = 'NA',
    email = 'NA',
    genero = '',
    fechaNac = date,
    notas = '',
  } = req.body;

  if (
    identidad === 'NA' ||
    nombre === 'NA' ||
    apellido === 'NA' ||
    email === 'NA'
  ) {
    return res.status(403).json({
      error:
        'Debe ingresar su identidad, nombre, apellido y correo electronico',
    });
  }

  const updateCliente: ICliente = {
    identidad,
    nombre,
    apellido,
    email,
    genero,
    fechaNac,
    notas,
    updatedAt: date,
    createdAt: date,
  };

  if (await clientesModel.update(id, updateCliente)) {
    return res.status(200).json({ updated: true });
  }

  return res.status(404).json({
    error: 'Error al actualizar el cliente',
  });
});

router.delete('/del/:id', async (req, res) => {
  const { id } = req.params;
  if (await clientesModel.delete(id)) {
    return res.status(200).json({ deleted: true });
  }
  return res.status(404).json({ error: 'No se pudo eliminar el cliente' });
});

export default router;
