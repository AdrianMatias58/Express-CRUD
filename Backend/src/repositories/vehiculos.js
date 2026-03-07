import Base from './Base.js'; // base de repo 
import { cnPool } from '../DB.js';
import Vehiculo from '../models/Vehiculo.js';
export default class VehiculoRepository extends Base {
    constructor() {
        super('vehiculo', cnPool, Vehiculo, 'id_vehiculo');
    }
    async getAll(){ 
        const [row] = await this.pool.query(`CALL P_V_DATOS_GENERALS()`)
        return row[0]
    }
    async updateEstado(id, estado) {
        try{
            //verificar existencia del vehiculo
            const vehiculo = await this.getById(id);
            if (vehiculo) {
                const [result] = await this.pool.query(
                `UPDATE ${this.table} SET estado = ? WHERE ${this.primaryKey} = ?`,
                [estado, id]);
                return result.affectedRows > 0; 
            }
        }catch(error){
            throw error;
        }
    }
    async VehiculosDisponible(){
        try{
            const [rows] = await this.pool.query(
                `CALL P_V_DISPONIBLE`
            );
            return rows;
        }catch(error){
            throw error;
        }
    }
    async delete(id){
        try{
            const [res] = await this.pool.query(`CALL P_ELIMINAR_VEH_COMPLETO(?)`, [id]);
            const row = res[0][0];
            return row ? row.filas_afectadas : 0;
        }catch(error){
            throw error;
        }
    }
    async Last_V_Estado(estado){
        const [row] = await this.pool.query(`CALL P_V_LAST_ESTADO(?)`, [estado])
        return row[0]
    }
}