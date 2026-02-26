import cnPool from "../DB.js";

export const VehiculoRepository = {
    //obtener todos los vehículos
  findAll: async () => {
    const [rows] = await pool.query("SELECT * FROM vehiculo");
    return rows;
  },

  // Buscar por ID
  findById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM vehiculo WHERE id_vehiculo = ?",
      [id],
    );
    return rows[0];
  },

  // Crear un nuevo vehículo
  create: async (datos) => {
    const { modelo, nro_identificacion } = datos;
    const [result] = await pool.query(
      "INSERT INTO vehiculo (modelo, nro_identificacion) VALUES (?, ?)",
      [modelo, nro_identificacion],
    );
    return result.insertId;
  },

  // Eliminar
  delete: async (id) => {
    const [result] = await pool.query(
      "DELETE FROM vehiculo WHERE id_vehiculo = ?",
      [id],
    );
    return result.affectedRows > 0;
  },
};
