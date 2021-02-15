
//simple node express server to serve static files
require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express();


app.use(express.json());

//rooted from /dnd_5e_charachter_sheet/ 
app.use('/dnd_5e_charachter_sheet/',express.static(`${__dirname}/../build`));

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../build/index.html')); })
app.listen('4444', () => console.log(`Running on port 4444`));