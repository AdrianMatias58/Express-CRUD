import {Router} from 'express'
import CtrllVehiculo from '../controllers/vehiculos.controller.js'
const route = Router()
//crear vehiculo
route.get('/vehiculo', CtrllVehiculo.getVehiculos)
//agregar vehiculo
route.get('/vehiculo/disponible', CtrllVehiculo.getVehiculosDisponible)
route.post('/vehiculo', CtrllVehiculo.createVehiculos)
//actulizar evhiculo
//route.put('/vehiculo', CtrllVehiculo.updateVehiculos)
//eliminar vehiculo 
route.delete('/vehiculo/:id', CtrllVehiculo.deleteVehiculos)

route.patch('/vehiculo/estado/:id', CtrllVehiculo.updateEstadoVehiculo);

export default route