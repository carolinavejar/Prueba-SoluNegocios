const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/conexion')
const app = express();
 
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'))

const indexRouter = require('./routes/index');
app.use('/', indexRouter.router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
console.log("CARITO");