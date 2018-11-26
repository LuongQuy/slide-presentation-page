const express = require('express');
const app = express();
app.listen(process.env.PORT || 3000);
const http = require('http').Server(app);
const io = require('./modules/stream-mudule')(http);
app.use(express.static('public'));