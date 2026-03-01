import {Router} from 'express'
import CtrllVehiculo from '../controllers/vehiculos.controller.js'
const route = Router()
//crear vehiculo
route.get('/api/vehiculo', CtrllVehiculo.getVehiculos)
//Obtener vehiculos disponibles
route.get('/api/vehiculo/disponible', CtrllVehiculo.getVehiculosDisponible)
//agregar vehiculo
route.post('/api/vehiculo', CtrllVehiculo.createVehiculos)
//Eliminar vehiculo
route.delete('/api/vehiculo/:id', CtrllVehiculo.deleteVehiculos)
//actulizar estado del vehiculo
route.patch('/api/vehiculo/estado/:id', CtrllVehiculo.updateEstadoVehiculo);

export default route