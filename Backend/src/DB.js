import { createPool } from 'mysql2/promise'

export const cnPool = createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    port:3306,
    database:'dbsystemaentrega',
    waitForConnections: true,
    connectionLimit:1,
    idleTimeout: 30000
})

