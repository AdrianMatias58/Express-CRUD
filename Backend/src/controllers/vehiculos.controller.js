import VehiculoRepo from "../repositories/vehiculos.js";
const ControllVehiculo = {};
const VehiculoR = new VehiculoRepo();

ControllVehiculo.getVehiculos = async (req, res) => {
  try {
    const vehiculos = await VehiculoR.getAll();
    res.json(vehiculos);
  } catch {
    res.status(500).json({ error: "Error al obtener los vehiculos" });
  }
};
ControllVehiculo.createVehiculos = async (req, res) => {
  try {
    const vehiculos = await VehiculoR.create(req.body);
    res.json({ message: "Vehículo creado correctamente" });
  } catch (error) {
    console.error("ERROR REAL:", error);
    res.status(500).json({ error: "Error al obtener los vehiculos" });
  }
};

ControllVehiculo.updateEstadoVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevoEstado = req.body.estado;
    const actulizar = await VehiculoR.updateEstado(id, nuevoEstado);

    if (actulizar)
      return res.json({
        message: "Estado del vehículo actualizado correctamente",
      });

    return res.status(404).json({
      message:
        "No se pudo actualizar: El vehículo no existe o el estado ya era el solicitado",
    });
  } catch (error) {
    console.error("ERROR REAL:", error);
    res.status(500).json({ error: "Error al obtener los vehiculos" });
  }
};

ControllVehiculo.deleteVehiculos = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculos = await VehiculoR.delete(id);
     if (vehiculos.affectedRows === 0) { 
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.json({ message: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error("ERROR REAL:", error);
    res.status(500).json({ error: "Error al obtener los vehiculos" });
  }
};
ControllVehiculo.getVehiculosDisponible = async (req, res) => {
    try {
        const vehiculos = await VehiculoR.VehiculosDisponible();
        res.json(vehiculos);
    } catch (error) {
        console.error("ERROR REAL:", error);
        res.status(500).json({ error: "Error al obtener los vehiculos disponibles" });
    }
}


export default ControllVehiculo;
