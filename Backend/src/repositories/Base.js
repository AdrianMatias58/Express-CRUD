export default class BaseRepository {
    constructor(table, pool, model, primaryKey = 'id') {
        this.table = table;
        this.pool = pool;
        this.model = model;
        this.primaryKey = primaryKey;
    }
    mapRowToModel(row){
        if (!row) return null;
        return new this.model(row);
    }
    async getAll() {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.table}`);
        return rows.map(row => this.mapRowToModel(row));
        
    }

    async getById(id) {
       const [rows] = await this.pool.query(
            `SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ?`, 
            [id]
        );
        return this.mapRowToModel(rows[0]);
    }

    async create(data) {
        const [result] = await this.pool.query(`INSERT INTO ${this.table} SET ?`, [data]);
        return result.insertId;
    }

    async delete(id) {
        const [result] = await this.pool.query(
            `DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`, 
            [id]
        );
    }
}

