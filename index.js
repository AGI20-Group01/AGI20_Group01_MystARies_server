const port = (process.env.PORT || 5000)
const io = require('socket.io')(port);
const shortId = require('shortid');
const os = require("os");

let networkInterfaces = os.networkInterfaces( );
let address = networkInterfaces['Wi-Fi'][1].address
const User = require('./src/User.js');

const users = {}

console.log(`Server started on ${address}:${port}`)

io.on('connection', function(socket) {
    const userId = createUser();
    console.log(`user ${userId} conected to server`);
    socket.emit('userId',  {id: userId})

    socket.on('AddCube' , function(data) {
        //console.dir(data)
        socket.broadcast.emit('AddCube', data)
    })

    socket.on('RemoveCube', function(data) {
        //console.dir(data)
        socket.broadcast.emit('RemoveCube', data)
    })

    socket.on('MoveTraveler', function(data) {
        //console.dir(data)
        socket.broadcast.emit('MoveTraveler', data)
    })

    socket.on('RotateTraveler', function(data) {
        //console.dir(data)
        socket.broadcast.emit('RotateTraveler', data)
    })

    socket.on('disconnect', function() {
        socket.broadcast.emit('remove', {id: userId})
        delete users[userId];
        console.log(`user ${userId} disconnect`);
    })
});

function createUser(socket) {
    const userId = shortId.generate();
    const user = new User(userId, socket);
    users[userId] = user;
    return userId;
}