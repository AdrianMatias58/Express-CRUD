import { Api } from "./axios.ts";
import type InterVehiculo from "../Interfaces/InterVehiculo.ts";

export const VehiculoServ = {
    AllVehiculos: async()=>{
        const {data} = await Api.get<InterVehiculo[]>("/vehiculo");
        return data;
    },
    VehiculosDisponible : async()=>{
        const {data} = await Api.get<InterVehiculo[]>("/vehiculo/disponible");
        return data;
    },
    CrearVehiculo : async(nuevoVehiculo: Omit<InterVehiculo, 'id_vehiculo'| 'created_at' | 'updated_at'| 'nombre_categoria'>)=>{
        const {data} = await Api.post<InterVehiculo>("/vehiculo",nuevoVehiculo);
        return data;
    },
    EliminarVehiculo : async (id: number)=>{
        await Api.delete(`/vehiculo/${id}`);
    },
    ActualVehiculo : async (id: number, datos : Partial<Omit<InterVehiculo, 'id_vehiculo'>>) =>{
        const {data} = await Api.patch<InterVehiculo>(`/vehiculo/estado/${id}`,datos);
        return data;
    },
    VehiculoEstado: async(estado : string)=>{
        const {data} = await Api.get<InterVehiculo[]>(`/vehiculo/estado/${estado}`);
        return data;
    }
};