import { createPool } from 'mysql2/promise'

export const cnPool = createPool({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'dbvehiculo',
    waitForConnections: true,
    connectionLimit:20,
    idleTimeout: 30000
})