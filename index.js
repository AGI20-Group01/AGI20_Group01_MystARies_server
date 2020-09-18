const port = (process.env.PORT || 5000)
const io = require('socket.io')(port);
const shortId = require('shortid');


const User = require('./src/User.js');

const users = {}

console.log(`Server started on port ${port}`)

io.on('connection', function(socket) {
    const userId = createUser();
    console.log(`user ${userId} conected to server`);
    socket.emit('userId',  {id: userId})

    socket.on('avatarSpawn' , function(data) {
        socket.broadcast.emit('avatarSpawn', data)
    })

    socket.on('avatarMove', function(data) {
        socket.broadcast.emit('avatarMove', data)
    })

    socket.on('itemMove', function(data) {
        socket.broadcast.emit('itemMove', data)
    })

    socket.on('takeMove', function(data) {
        socket.broadcast.emit('takeMove', data)
    })

    socket.on('disconnect', function() {
        socket.broadcast.emit('remove', {id: userId})
        delete users[userId];
        console.log(`user ${userId} disconnect`)
    })
});

function createUser(socket) {
    const userId = shortId.generate();
    const user = new User(userId, socket);
    users[userId] = user;
    return userId;
}