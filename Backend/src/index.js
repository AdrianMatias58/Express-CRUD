import express from 'express'
import RutasCarga from './routes/carga.route.js'
import RutasVehiculo from './routes/vehiculos.routes.js'
import cors from 'cors';
const app = express()
app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(RutasCarga)
app.use(RutasVehiculo)
app.listen(3000, ()=>console.log('server on 3000'))