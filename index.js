require('dotenv').config();
const path             = require('path');
const express          = require('express');
const AdminJS         = require('adminjs');
const schedule = require('node-schedule');


//Initiliazations
app = express();
const connection = require('./src/config/db.config');
const { job }    = require('./src/Job/job');
const AdminJSoptions    = require('./admin/options/index.options');
const buildAdminRouter = require('./admin/routes/admin.routes');

//Setings
app.use(express.static(path.join(__dirname,'src/public')));

const port = process.env.PORT || 8000;

// Database
connection.once('open', ()=>console.log('Database connected Successfully'));
connection.on("error", console.error.bind(console, "connection error: "));

const adminBro = new AdminJS(AdminJSoptions);
const router = buildAdminRouter(adminBro);


// app.get('/hola-mundo', function (req, res) {
//   res.send('Hello World en su respectiva ruta en app.js')
//   });

//app.use(bodyParser.json());
app.use(adminBro.options.rootPath, router);
//app.use('/admin', router);
app.use('/uploads', express.static('uploads'));


/*
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/
const rule = new schedule.RecurrenceRule();


//SECOND, '*/10 * * * * *' CADA 10 SEGUNDOS
//DAYOFWEEK, 0-6
//HOUR
//MINUTE '42 * * * *', Execute a cron job when the minute is 42 (e.g. 19:42, 20:42, etc.).
// Execute a cron job every 5 Minutes = */5 * * * *
//'0 39 5 * * *' 5:39:00
//'10 41 5 * * *' 5:41:10

if(process.env.SECOND)
    rule.second = process.env.SECOND;

if(process.env.MINUTE)
    rule.minute = process.env.MINUTE;    

if(process.env.HOUR)
    rule.hour = process.env.HOUR;

if(process.env.DAYOFMONTH)
    rule.dayOfMonth = process.env.DAYOFMONTH;

if(process.env.MONTH)
    rule.month = process.env.MONTH;

if(process.env.DAYOFWEEK)
    rule.dayOfWeek = process.env.DAYOFWEEK;

// const mJob = schedule.scheduleJob('* * * * * *', function(){
const mJob = schedule.scheduleJob(rule, function(){
   
   console.log('The answer to life, the universe, and everything!');
   job();
 });



app.listen(port, ()=>console.log(`Listening at Port ${port}`));