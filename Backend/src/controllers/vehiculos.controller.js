import VehiculoRepo from "../repositories/vehiculos.js";
const ControllVehiculo = {};
const VehiculoR = new VehiculoRepo();

ControllVehiculo.getVehiculos = async (req, res) => {
  try {
    const vehiculos = await VehiculoR.getAll();
    // Agregamos RETURN para que no intente ejecutar el 200 después del 404
    if (!vehiculos || vehiculos.length === 0) {
      return res.status(404).json({ message: "No se encontro ningun vehiculo" });
    }
    return res.status(200).json(vehiculos);
  } catch (error) {
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

ControllVehiculo.createVehiculos = async (req, res) => {
  try {
    const nuevoId = await VehiculoR.create(req.body); 
    // Recuerda: nuevoId ya es el insertId que devolvió tu Repo
    return res.status(201).json({ 
      message: "Vehiculo creado correctamente",
      id: nuevoId
    });
  } catch (error) {
    console.error("ERROR REAL:", error);
    return res.status(500).json({ error: "Error al crear el vehiculo" });
  }
};

ControllVehiculo.updateEstadoVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevoEstado = req.body.estado;
    const actualizado = await VehiculoR.updateEstado(id, nuevoEstado);

    if (!actualizado) {
      return res.status(404).json({
        message: "No se pudo actualizar: El vehículo no existe o el estado ya era el solicitado",
      });
    }
    return res.status(200).json({
      message: "Estado del vehículo actualizado correctamente",
    });
  } catch (error) {
    console.error("ERROR REAL:", error);
    return res.status(500).json({ error: "Error al actualizar vehiculo" });
  }
};

ControllVehiculo.deleteVehiculos = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Falta el ID del vehiculo" });
    const result = await VehiculoR.delete(id);
    if (result === 0) {
      return res.status(404).json({ message: "No se encontró el vehículo o no esta descontinuado" });
    }
    return res.status(200).json({ 
        message: "Vehiculo eliminado correctamente" 
      });
  } catch (error) {
    console.error("Error en el catch:", error);
    return res.status(500).json({ error: "Error interno" });
  }
};

ControllVehiculo.getVehiculosDisponible = async (req, res) => {
    try {
        const vehiculos = await VehiculoR.VehiculosDisponible();
        // Al quitar el [0], Jest ya podrá leer el .length del array
        return res.status(200).json(vehiculos); 
    } catch (error) {
        console.error("ERROR REAL:", error);
        return res.status(500).json({ error: "Error al obtener los vehiculos disponibles" });
    }
}

export default ControllVehiculo;