require('dotenv').config();
const path             = require('path');
const express          = require('express');
const AdminBro         = require('admin-bro');
const bodyParser = require('body-parser');
//Initiliazations
app = express();
const connection = require('./src/config/db.config');
const options  = require('./admin/options/index.options');
const buildAdminRouter = require('./admin/routes/admin.routes');

//Setings
app.use(express.static(path.join(__dirname,'src/public')));

const port = process.env.PORT || 8080;

// Database
connection.once('open', ()=>console.log('Database connected Successfully'));
connection.on("error", console.error.bind(console, "connection error: "));

const adminBro = new AdminBro(options);
const router = buildAdminRouter(adminBro);

app.get('/hola-mundo', function (req, res) {
  res.send('Hello World en su respectiva ruta en app.js')
  });

app.use(bodyParser.json());
//app.use(adminBro.options.rootPath, router);
app.use('/admin', router);
app.use('/uploads', express.static('uploads'));

app.listen(port, ()=>console.log(`Listening at Port ${port}`));