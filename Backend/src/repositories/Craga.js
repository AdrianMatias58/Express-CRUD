import Base from "./Base.js";
import { cnPool } from "../DB.js";
import Carga from "../models/Carga.js";

export default class CargaRepository extends Base {
constructor(){
    super('carga', cnPool, Carga, 'id_carga');
}

async asignarVehiculo(idCraga, idVehiculo){
    try{
        //verificar existencia de la carga
        const carga = await this.getById(idCraga);
        if (carga) {
            const [result] = await this.pool.query(
                `UPDATE ${this.table} SET id_vehiculo = ? WHERE ${this.primaryKey} = ?`,
                [idVehiculo, idCraga]
            )
            return result
        }
    }catch(error){
        throw error;
    }
}

}