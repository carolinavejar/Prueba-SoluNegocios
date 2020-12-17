var express = require('express');
var router = express.Router();
const db = require('../db/conexion');

router.post('/getUsuarios', function (req, res) {
    db.getUsuarios().then((data) => {
        console.log("data", data);
        res.send(data);
    }).catch((err) => {
        res.send("ERROR");
    })
})

router.post('/getCreditosUsuario', function (req, res) {
    db.getCreditosUsuario(req.body).then((data) => {
        console.log("data", data);
        res.send(data);
    }).catch((err) => {
        res.send("ERROR");
    })
})

module.exports = router;