import { response } from 'express'
import app from '../index.js'
import request from 'supertest' 

//ruta de obtener todo los vehiculos
describe('GET /api/Vehiculos', ()=>{
    const arrayERROR = [
    
    {
        "modelo": "Avión Boeing 777F",
        "ASDAS": "VI-GHIJK",
        "estado": "Mantenimiento",
        "nombre_categoria": "Aéreo"
    },
    {
        "modelo": "Helicóptero de Carga",
        "nro_identif": "VIN-AE-005-QRSTU",
        "estado": "D",
        "nombre_categoria": "Aéreo"
    },
    {
        "modelo": "carton",
        "nro_identif": "asbdiudw-sadw",
        "estado": "",
        "nombre_categoria": "Terrestre"
    },
    {
        "modelo": "dasdawasbjhw",
        "nro_identificacion": "=dboidkwdsa",
        "estado": "Disponible",
        "nombre_categoria": "Terrestre"
    }
    ]
    test('Debería obtener repuesta 200', async () =>{
        const res = await request(app).get('/api/vehiculo').send();
        expect(res.statusCode).toBe(200)
    })
    test('Debería compara la cantidad de los balores que hay en el array que serian 4', async () =>{
        const res = await request(app).get('/api/vehiculo').send();
        expect(res.body.length).toBe(4)
    })

    test('Debería FALLAR : comparacion de los datos si son iguales y los valores que deberia tener comparado', async () =>{
        const res = await request(app).get('/api/vehiculo').send();
        expect(res.body).not.toEqual(arrayERROR)
    })
})
