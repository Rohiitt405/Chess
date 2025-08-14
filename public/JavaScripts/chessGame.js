const socket = io();

socket.emit("Invitation");
socket.on("Invitation Received", () => {
    console.log("Invitation Received, Accepted!")
});


// Connection event handlers
// socket.on('connect', () => {
//     console.log('Connected to server');
//     socket.emit("Invitation");
// });

// socket.on('connect_error', (error) => {
//     console.error('Connection error:', error);
// });

// socket.on('disconnect', () => {
//     console.log('Disconnected from server');
// });