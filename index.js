const express = require('express');
const app = express();
app.listen(process.env.PORT || 3000);
const http = require('http').Server(app);

app.use(express.static('public'));