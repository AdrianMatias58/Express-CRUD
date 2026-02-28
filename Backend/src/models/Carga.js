export default class Carga {
    constructor(data){
        this.id= data.id_carga
        this.peso = data.peso
        this.destino = data.destino
        this.contenido= data.contenido
        this.id_vehiculo = data.id_vehiculo
    }

}