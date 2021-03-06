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

        let query_valida = `select count(*) as cantidad from credito_usuario
                            where correo_usuario = '` + data.correo + `' AND id_tienda = ` + data.id_tienda + `;`
        const [resultsValida] = await db.query(query_valida);

        if (resultsValida[0].cantidad == 0) {
            let query = `insert into credito_usuario
            (credito, correo_usuario, id_tienda) 
            values(` +  data.creditos + `, '` + data.correo + `', ` + data.id_tienda + `);`;
            const [results] = await db.query(query);
            return results;
        } else {
            let query = `update credito_usuario
                set credito = credito + ` + data.creditos + `
                where correo_usuario = '` + data.correo + `' AND id_tienda = ` + data.id_tienda + `;`
            const [results, metadata] = await db.query(query);
            // console.log("metadata", metadata);
            return results;
        }
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
        let query = `select a.correo, b.credito, c.nombre as nombre_tienda, c.id_tienda from usuario a 
                     left join credito_usuario b 
                     on a.correo = b.correo_usuario 
                     left join tienda c
                     on c.id_tienda = b.id_tienda
                     where a.correo = '` + data.correo + `' ;`;
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        console.log("error", error);
        throw new Error('Error')
    }
}

async function getCreditosUsuarioTienda(data) {
    try {
        let query = `select a.correo, b.credito, c.nombre as nombre_tienda, c.id_tienda from usuario a 
                     left join credito_usuario b 
                     on a.correo = b.correo_usuario 
                     left join tienda c
                     on c.id_tienda = b.id_tienda
                     where a.correo = '` + data.correo + `'  and b.id_tienda = ` + data.id_tienda + `;`;
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        console.log("error", error);
        throw new Error('Error')
    }
}


async function getCreditosTienda(data) {
    try {
        // let query = `select sum(credito) as total_credito from credito_usuario
        //              where id_tienda = ` + data.id_tienda +`;`;

        //Trae los usuarios y creditos por tienda
        let query = `select a.correo_usuario as correo, a.credito, c.nombre as nombre_tienda, c.id_tienda
                     from credito_usuario a 
                     left join usuario b 
                     on b.correo = a.correo_usuario 
                     left join tienda c
                     on c.id_tienda = a.id_tienda
                     where a.id_tienda = '` + data.id_tienda + `' ;`;
        const [results] = await db.query(query);
        return results;
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
    getCreditosTienda,
    getCreditosUsuarioTienda
};