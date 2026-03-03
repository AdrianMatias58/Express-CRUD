export default class Carga {
    constructor(data){
        this.id= data.id_carga
        this.peso = data.peso
        this.destino = data.destino
        this.contenido= data.contenido
        //secicon vehiculo
        this.id_vehiculo = data.id_vehiculo
        data.id_vehiculo ?
            this.vehiculo = {
                id: data.id_vehiculo, 
                nro_identificacion : data.nro_identificacion
            }: this.vehiculo = null
        
            //para categoria
        this.id_categoria = data.id_categoria
        data.nombre_categoria ? 
            this.categoria= {
                id: data.id_categoria,
                nombre: data.nombre_categoria
            }: this.categoria = null
        this.created_at = data.created_at
        this.updated_at = data.updated_at
    }
}