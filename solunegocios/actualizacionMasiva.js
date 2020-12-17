const csv = require('csvtojson')
const db = require('./db/conexion')

console.log("Actualizacion masiva");
actualizacionMasiva();

async function actualizacionMasiva() {
    const converter = csv()
        .fromFile('./actualizacion_creditos.csv')
        .then((json) => {
            (async function () {
                for (const usuario_credito of json) {
                    let resultado = await db.setCreditos(usuario_credito);
                    console.log(resultado)
                }
            })();
        })
}