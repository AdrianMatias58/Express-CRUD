import Base from "./Base.js";
import { cnPool } from "../DB.js";
import Paquete from "../models/Paquete.js";

export default class CargaRepository extends Base {
constructor(){
    super('paquete', cnPool, Paquete, 'id_carga');
}

async asignarVehiculo(idPaquete, idVehiculo){
    try{
        //verificar existencia de la carga
        const carga = await this.getById(idPaquete);
        if (carga) {
            const [result] = await this.pool.query(
                `UPDATE ${this.table} SET id_vehiculo = ? WHERE ${this.primaryKey} = ?`,
                [idVehiculo, idPaquete]
            )
            return result
        }
    }catch(error){
        throw error;
    }
}

}