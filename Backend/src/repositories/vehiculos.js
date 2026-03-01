import Base from './Base.js'; // base de repo 
import { cnPool } from '../DB.js';
import Vehiculo from '../models/Vehiculo.js';
export default class VehiculoRepository extends Base {
    constructor() {
        super('vehiculo', cnPool, Vehiculo, 'id_vehiculo');
    }
    async updateEstado(id, estado) {
        try{
            //verificar existencia del vehiculo
            const vehiculo = await this.getById(id);
            if (vehiculo) {
                const [result] = await this.pool.query(
                `UPDATE ${this.table} SET estado = ? WHERE ${this.primaryKey} = ?`,
                [estado, id]);
                return result
            }
        }catch(error){
            throw error;
        }
    }
    async VehiculosDisponible(){
        try{
            const [rows] = await this.pool.query(
                `SELECT * FROM ${this.table} WHERE estado = 1`
            );
            return rows.map(row => new this.model(row));
        }catch(error){
            throw error;
        }
    }
    async delete(id){
        try{
            await this.pool.query(`UPDATE carga SET id_vehiculo = NULL WHERE id_vehiculo = ?`, [id]);
            return await super.delete(id);
        }catch(error){
            throw error;
        }
    }
}