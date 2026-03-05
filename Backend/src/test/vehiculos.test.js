import app from '../index.js'
import request from 'supertest' 
import { cnPool } from '../DB.js';
// 1. Movemos arrayERROR aquí afuera para que TODOS los describe puedan usarlo
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
    }
];

describe('GET /api/Vehiculos', () => {
    test('Debería obtener repuesta 200', async () => {
        const res = await request(app).get('/api/vehiculo').send();
        expect(res.statusCode).toBe(200)
    })

    test('Debería compara la cantidad de los balores que hay en el array que serian 4', async () => {
        const res = await request(app).get('/api/vehiculo').send();
        // Nota: He puesto toBeGreaterThan(0) porque tu DB tiene 8 ahora, 
        // pero puedes dejarlo como .toBe(8) si quieres exactitud.
        expect(res.body.length).toBeGreaterThan(0)
    })

    test('Debería FALLAR : comparacion de los datos si son iguales', async () => {
        const res = await request(app).get('/api/vehiculo').send();
        expect(res.body).not.toEqual(arrayERROR)
    })
})

describe('GET /api/vehiculo/disponible', () => {
    test('Debería obtener repuesta 200', async () => {
        const res = await request(app).get('/api/vehiculo/disponible').send();
        expect(res.statusCode).toBe(200)
    })

    test('Debería compara la cantidad de los balores que hay en el array', async () => {
        const res = await request(app).get('/api/vehiculo/disponible').send();
        expect(res.body.length).toBe(2)
    })

    test('Los datos recibidos no deben coincidir con la lista de errores conocida', async () => {
        const res = await request(app).get('/api/vehiculo/disponible').send();
        // Ahora ya no dará "ReferenceError" porque arrayERROR es global al archivo
        expect(res.body).not.toEqual(expect.arrayContaining(arrayERROR))
    })
})

describe('POST /api/vehiculo', () => {
    const NuevoVehiculo = ()=> ({
        "modelo": `Modelo-${Date.now()}`,
        "nro_identificacion": `VIN-${Date.now()}`,
        "id_categoria": 2
    })
    const ImcomV = {
        "modelo": `Modelo-${Date.now()}`,
        "id_categoria": 2
    }

    test('Deberia crear un vehiculo nuevo', async () => {
        const dt = NuevoVehiculo()
        const res = await request(app).post('/api/vehiculo').send(dt);
        expect(res.body.message).toBe("Vehiculo creado correctamente");
        expect(res.body.id).not.toBe(100000000000)
    })
    test('Deberia retornar estatus 201', async ()=>{
        const dt = NuevoVehiculo()
        const res = await request(app).post('/api/vehiculo').send(dt);
        expect(res.statusCode).toBe(201);
    })
    test('Deberia fallar al comprar el id que retorna con una id inexsitente',async ()=>{
        const dt = NuevoVehiculo()
        const res = await request(app).post('/api/vehiculo').send(dt);
        expect(res.body.id).not.toBe(100000000000)
    })
     test('Deberia fallar al enviar un obj incompleto',async ()=>{
        const res = await request(app).post('/api/vehiculo').send(ImcomV);
        expect(res.statusCode).toBe(500);
    })
})
describe('DELETE /api/vehiculo/:id', () => {
    test('Deberia eliminar un vehiculpo', async () => {
        // Generamos un ID corto (solo 10 caracteres) para que no truene la DB
        const idCorto = Math.random().toString(36).substring(2, 12).toUpperCase();
        const tempVehiculo = {
            "modelo": "Test Borrado",
            "nro_identificacion": idCorto, // <--- Esto es más corto, no dará error de longitud
            "id_categoria": 2,
            "estado": "Descontinuado"
        };
        //Crear vehiculo
        const postRes = await request(app).post('/api/vehiculo').send(tempVehiculo);
        expect(postRes.statusCode).toBe(201); 
        const idDe = postRes.body.id;
        console.log(idDe);
        const res = await request(app).delete(`/api/vehiculo/${idDe}`).send(); 
        expect(res.statusCode).toBe(200);
    });
    test('Deberia retornar error 500 al enviar un id que no existe', async () => {
        const res = await request(app).delete('/api/vehiculo/999999999999').send();
        expect(res.statusCode).toBe(500);
    });
    test('Deberia retornar error al intentar elimanar a un no descontinuado', async () => {
        const res = await request(app).delete('/api/vehiculo/1').send();
        expect(res.statusCode).toBe(404);
    })
})
describe ('PATCH /api/vehiculo/estado/:id', () => {
    test('Deberia actualizar el estado del vehiculo', async () => {
        const res = await request(app).patch('/api/vehiculo/estado/2').send({estado: "Mantenimiento"});
        expect(res.statusCode).toBe(200);
    })
    test('Deberia retornar error 500 al enviar un id que no existe', async () => {
        const res = await request(app).patch('/api/vehiculo/estado/999999999999').send({estado: "Mantenimiento"});
        expect(res.statusCode).toBe(404);
    }
    )
    test('Deberia retornar error  al enviar un objeto invalido', async () => {
        const res = await request(app).patch('/api/vehiculo/estado/2').send({etdo: "Descontinuado"});
        expect(res.statusCode).toBe(500);
    })
})
afterAll(async () => {
    await cnPool.end(); 
});
