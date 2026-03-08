export default interface InterVehiculo{
    id_vehiculo : number;
    modelo : string;
    nro_identificacion : string;
    estado? : string;
    id_categoria? : number;
    nombre_categoria?: string;
    created_at?: string | Date | null; 
    fecha_actualizacion?: string| Date|null;

}