export default class Categoria {
    constructor(data){
        this.id = data.id_categoria
        this.nombre = data.nombre
        this.created_at = data.created_at
        this.updated_at = data.updated_at
}
}