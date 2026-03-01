import api from "../Api/config.js";

export const VehiculsoServ ={
    async TodosgetVehiculos(){
        try {
            const {data} = await api.get("/api/vehiculo");
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async createVehiculos(vehiculo){
        try {
            const {data} = await api.post("/api/vehiculo", vehiculo);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteVehiculo(id){
        try {
            const {data} = await api.delete(`/api/vehiculo/${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async updateEstadoVehiculo(id,estadoActual){
        try {
            const {data} = await api.patch(`/api/vehiculo/estado/${id}`,{estado:estadoActual});
        } catch (error) {
            console.log(error);
        }
    }
}

