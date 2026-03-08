import {Router} from 'express'
import CtrllVehiculo from '../controllers/vehiculos.controller.js'
const route = Router()
//crear vehiculo
route.get('/api/vehiculo', CtrllVehiculo.getVehiculos)
//Obtener vehiculos disponibles
route.get('/api/vehiculo/disponible', CtrllVehiculo.getVehiculosDisponible)
//optener segun estado
route.get('/api/vehiculo/Cantidad/Estado',CtrllVehiculo.Vehiculo_Cant_Stdo)
route.get('/api/vehiculo/UltIngrezado',CtrllVehiculo.UlitmoIngresado)
route.get('/api/vehiculo/UltActulizado',CtrllVehiculo.UlitmoActulizado)
route.get('/api/vehiculo/estado/:estado', CtrllVehiculo.Vehiculo_Estado)
//agregar vehiculo
route.post('/api/vehiculo', CtrllVehiculo.createVehiculos)
//Eliminar vehiculo
route.delete('/api/vehiculo/:id', CtrllVehiculo.deleteVehiculos)
//actulizar estado del vehiculo
route.patch('/api/vehiculo/estado/:id', CtrllVehiculo.updateEstadoVehiculo);

export default route