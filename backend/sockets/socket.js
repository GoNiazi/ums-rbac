import { Server } from 'socket.io';

export default (server) => {
    const io = new Server(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('roleUpdate', (data) => {
            io.emit('roleUpdated', data);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};