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
                const actulizarestado = (estado === true) ? 1 : 0;
                const [result] = await this.pool.query(
                `UPDATE ${this.table} SET estado = ? WHERE ${this.primaryKey} = ?`,
                [actulizarestado, id]);
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
}