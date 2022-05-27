const io = require( "socket.io" )();
const socketapi = {
    io: io
};

const user = {}

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "A user connected"  );
    socket.on('newUserJoined', (name)=>{
              user[socket.id] = name
              socket.broadcast.emit('user-joined', name)
    } )
    socket.on('send', (message)=>{
              socket.broadcast.emit('receive', {message: message, name: user[socket.id]})
    } )

});
// end of socket.io logic

module.exports = socketapi;