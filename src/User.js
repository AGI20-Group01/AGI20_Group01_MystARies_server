module.exports = class User {
    constructor(id, socket) {
        this.id = id;
        this.name = "";
        this.inRoom = null;
    }

    setRoom(room) {
        this.inRoom = room;
    }

    setName(name) {
        this.name = name;
    }
}