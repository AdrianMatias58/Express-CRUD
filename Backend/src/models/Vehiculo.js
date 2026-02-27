 export default class Vehiculo {
    constructor(data){
        this.id= data.id_vehiculo
        this.modelo = data.modelo
        this.nro_identificacion = data.nro_identificacion
        this.estado = data.estado
    }

}