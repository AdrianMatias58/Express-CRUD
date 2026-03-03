 export default class Vehiculo {
    constructor(data){
        this.id= data.id_vehiculo
        this.modelo = data.modelo
        this.nro_identificacion = data.nro_identificacion
        this.estado = data.estado
        //seccion de categoria
        this.id_categoria = data.id_categoria 

        //mostrar el nombre de la categoria
        this.id_categoria ? 
            this.categoria= {
                id: data.id_categoria,
                nombre: data.nombre
            }
            : this.categoria = null    
        this.updated_at = data.updated_at
    }
}