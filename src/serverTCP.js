const net = require('net');
function serverTCP(port,host){
    const server = net.createServer();
    let sockets = [];
    
    server.listen(port);

    server.on('connection', socket => {
        console.log(`Client Connected => ${socket.remoteAddress}:${socket.remotePort}`);
        sockets.push(socket);

        socket.on('data', data => {
            console.log('RECEIVED DATA \n');
            console.log(data);
            console.log('\n');
        });

        socket.on('close', data => {
            let client = sockets.findIndex(ress => {
                return ress.remoteAddress === socket.remoteAddress && ress.remotePort === socket.remotePort;
            });

            if(client !== -1) sockets.splice(client, 1);
            console.log(`CLOSED: ${socket.remoteAddress}:${socket.remotePort}`);
        });
    });
}
module.exports = serverTCP;