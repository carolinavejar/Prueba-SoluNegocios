var express = require('express');
var router = express.Router();
const db = require('../db/conexion');

router.post('/getTiendas', function (req, res) {
        db.getTiendas().then((data) => {
            console.log("data", data);
            res.send(data);
        }).catch((err) => {
            res.send("ERROR");
        })
});

router.post('/getCreditosTienda', function (req, res) {
    db.getCreditosTienda(req.body).then((data) => {
        console.log("data", data);
        res.send(data);
    }).catch((err) => {
        res.send("ERROR");
    })
});

module.exports = router;