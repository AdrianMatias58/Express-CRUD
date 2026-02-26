import express from 'express'
import RutasCarga from './routes/carga.route.js'
import RutasVehiculo from './routes/vehiculos.routes.js'
const app = express()
app.use(express.json())
app.use(RutasCarga)
app.use(RutasVehiculo)

app.listen(3000, ()=>console.log('server on 3000'))