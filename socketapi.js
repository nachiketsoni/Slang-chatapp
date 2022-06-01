const { use } = require("express/lib/application");

const io = require("socket.io")();
const socketapi = {
    io: io
};

const user = []

// Add your socket.io logic here!
io.on("connection", function (socket) { 
    socket.on('newUserJoined', (name) => {
        
        user.push(name)
        socket.broadcast.emit('user-joined', name)
        io.emit('alluser', user)
        console.log(user)
        socket.on('disconnect', function () {
            socket.broadcast.emit('user-disconnected',name)
            let index = user.indexOf(name)
            user.splice(index , 1)
            io.emit('alluser', user)
        })
        
        socket.on('send', (message) => {
            socket.broadcast.emit('receive', { message: message, name: name })
        })

    })

});
// end of socket.io logic

module.exports = socketapi;