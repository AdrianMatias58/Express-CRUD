import {Router} from 'express'
import CtrllVehiculo from '../controllers/vehiculos.controller.js'
const route = Router()
//crear vehiculo
route.get('/vehiculo', CtrllVehiculo.getVehiculos)
//agregar vehiculo
route.post('/vehiculo', CtrllVehiculo.createVehiculos)
//actulizar evhiculo
route.put('/vehiculo', CtrllVehiculo.updateVehiculos)
//eliminar vehiculo 
route.delete('/vehiculo', CtrllVehiculo.deleteVehiculos)

export default route