const {
    Sequelize,
    QueryTypes
} = require("sequelize");
const path = require("path");

const db = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "./prueba.db")
});

async function setCreditos(data) {
    try {
        console.log("data setCreditos", data);
        let query = `UPDATE credito_usuario
                SET credito = credito + ` + data.creditos + `
                WHERE correo_usuario = '` + data.correo + `' AND id_tienda = ` + data.id_tienda + `;`
        const [results, metadata] = await db.query(query);
        console.log("-----------------result", results);
        return results;
    } catch (error) {
        throw new Error('Error')
    }
}

async function getTiendas() {
    try {
        let query = `SELECT * FROM tienda;`;
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        throw new Error('Error')
    }
}

async function getUsuarios() {
    try {
        let query = `select * from usuario a  left join credito_usuario b on a.correo = b.correo_usuario ;`;
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        console.log("error", error);
        throw new Error('Error')
    }
}

async function getCreditosUsuario(data) {
    try {
        let query = `select a.correo, b.credito, b.credito, c.nombre as nombre_tienda, c.id_tienda from usuario a 
                     left join credito_usuario b 
                     on a.correo = b.correo_usuario 
                     left join tienda c
                     on c.id_tienda = b.id_tienda
                     where a.correo = '` + data.correo +`' ;`;
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        console.log("error", error);
        throw new Error('Error')
    }
}

async function getCreditosTienda(data) {
    try {
        let query = `select sum(credito) as total_credito from credito_usuario
                     where id_tienda = ` + data.id_tienda +`;`;
        const [results] = await db.query(query);
        console.log("-----------------result", results);
    } catch (error) {
        console.log("error", error);
        throw new Error('Error')
    }
}

module.exports = {
    Sequelize,
    QueryTypes,
    db,
    setCreditos,
    getTiendas,
    getUsuarios,
    getCreditosUsuario,
    getCreditosTienda
};