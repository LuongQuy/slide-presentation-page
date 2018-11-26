const socketio = require('socket.io');

var stream_module = (server) => {
    io = socketio(server);
    var arrRoom = [];
    io.on('connection', socket => {
        socket.on('create or join', room => {
            var myRoom = io.sockets.adapter.rooms[room] || {length: 0};
            var numClients = myRoom.length;
            if(numClients == 0){
                socket.join(room);
                socket.emit('created', room);
                arrRoom.push(room);
                io.sockets.emit('server send arrRoom', arrRoom);
            }else if(numClients == 1){
                socket.join(room);
                socket.emit('joined', room);
            }else{
                socket.emit('full', room);
            }
        });
    
        socket.on('ready', room => {
            socket.broadcast.to(room).emit('ready');
        });
    
        socket.on('offer', offer => {
            socket.broadcast.to(offer.room).emit('offer', offer.sdp);
        });
    
        socket.on('candidate', candidateData => {
            socket.broadcast.to(candidateData.room).emit('candidate', candidateData);
        })
    
        socket.on('answer', answer => {
            socket.broadcast.to(answer.room).emit('answer', answer.sdp);
        });
    });
}
module.exports = stream_module;