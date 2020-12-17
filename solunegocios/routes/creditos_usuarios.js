var express = require('express');
var router = express.Router();
const db = require('../db/conexion');

router.post('/setCreditos', function (req, res) {
    return new Promise((resolve, reject) => {
        db.setCreditos(req.body).then(() => {
            res.send("OK");
        }).catch((err) => {
            res.send("ERROR");
        })
    })
});

module.exports = router;