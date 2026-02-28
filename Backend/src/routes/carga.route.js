import {Router} from 'express'
import CtrllCarga from '../controllers/carga.controller.js'
const route = Router()
//obtener cargas
route.get('/carga',CtrllCarga.getCargas)
//crear garga
route.post('/carga', CtrllCarga.createCargas)
route.patch('/carga/asignar-vehiculo/:id', CtrllCarga.asignarVehiculo)
route.delete('/carga/:id', CtrllCarga.deleteCargas)
export default route