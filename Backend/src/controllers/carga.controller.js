import CargaRepo from "../repositories/Craga.js";

const CotrollerCarga = {};
const CargaR = new CargaRepo();

CotrollerCarga.getCargas = async (req, res) => {
    try{
        const cargas = await CargaR.getAll();
        res.json(cargas);
    }catch(error){
        res.status(500).json({ error: "Error al obtener las cargas" });
    }
}
CotrollerCarga.createCargas = async (req, res) => {
    try{
        const cargas = await CargaR.create(req.body);   
        res.json({ message: "Carga creada correctamente" });
    }catch(error){  
        res.status(500).json({ error: "Error al crear la carga" });
    }
}
CotrollerCarga.asignarVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_vehiculo } = req.body;
        const asignar = await CargaR.asignarVehiculo(id, id_vehiculo);
        if (asignar) return res.json({ 
            message: "Vehículo asignado a la carga correctamente" 
        });
        return res.status(404).json({
            message: "No se pudo asignar: La carga o el vehículo no existen, o la carga ya tiene un vehículo asignado"
        });
    } catch (error) {
        
        res.status(500).json({ error: "Error al asignar el vehículo a la carga" });
    }
}
CotrollerCarga.deleteCargas = async (req, res) => {
    try{
        const { id } = req.params;
        const eliminado = await CargaR.delete(id);
        if (!eliminado) {
            return res.status(404).json({ error: "Carga no encontrada" });
        }
        res.json({ message: "Carga eliminada correctamente" });
    }catch(error){
        res.status(500).json({ error: "Error al eliminar la carga" });
    }        
}
export default CotrollerCarga;