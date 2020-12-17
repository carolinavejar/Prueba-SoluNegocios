var express = require('express');
var router = express.Router();
const db = require('../db/conexion');

router.post('/setCreditos', function (req, res) {
    db.setCreditos(req.body).then(() => {
        res.send({"res": "Información actualizada"})
    }).catch((err) => {
        res.send({"res": "Error - valide la inforemación enviada"})
    })
});


router.post('/agregarCreditos', function (req, res) {
    if (req.body.creditos && req.body.correo && req.body.id_tienda) {
        if(parseInt(req.body.creditos) != NaN && req.body.creditos < 0) {
            req.body.creditos = req.body.creditos * -1;
        }
        db.setCreditos(req.body).then(() => {
            res.send({"res": "Información actualizada"})
        }).catch((err) => {
            res.send({"res": "Error - no se actualizaron los creditos"})
        })
    }
    else {
        res.send({"res": "Error - valide la inforemación enviada"})
    }

    db.setCreditos(req.body).then(() => {
        res.send({"res": "Información actualizada"})
    }).catch((err) => {
        res.send({"res": "Error - valide la inforemación enviada"})
    })
});


router.post('/quitarCreditos', function (req, res) {
    if (req.body.creditos && req.body.correo && req.body.id_tienda) {
        if(parseInt(req.body.creditos) != NaN && req.body.creditos > 0) {
            req.body.creditos = req.body.creditos * -1;
        }
        db.setCreditos(req.body).then(() => {
            res.send({"res": "Información actualizada"})
        }).catch((err) => {
            res.send({"res": "Error - no se actualizaron los creditos"})
        })
    }
    else {
        res.send({"res": "Error - valide la inforemación enviada"})
    }
});

module.exports = router;