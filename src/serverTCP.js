const net = require('net'); // importando o modulo net do node
function findIndexClient(sockets,socket) { // função que obtem a posição do usuario no array sockets
    let index = sockets.findIndex(ress => {
        return ress.remoteAddress === socket.remoteAddress && ress.remotePort === socket.remotePort;
    });
    return index;
}
function mountData(sockets,index,data) { // monta o retorno dos dados do cliente
    const { remoteAddress } = sockets[index];
    const { remotePort } = sockets[index];
    console.log(`Client [${remoteAddress}:${remotePort}]: ${String(data)}`);
}
function serverTCP(port,host){ 
    const server = net.createServer(); // cria o server e salva na variavel server
    let sockets = [];
    
    server.listen(port,host); // escuta na porta e host colocados na função

    server.on('connection', socket => { // monitora o evento de connection de um cliente que quando conectado executa uma função de callback
        console.log(`Client Connected => ${socket.remoteAddress}:${socket.remotePort} \n`); 
        sockets.push(socket); // coloca o socket do cliente no array de sockets

        socket.on('data', data => { // monitora o evento de data de quando o servidor recebe alguma mensagem 
            const index = findIndexClient(sockets,socket); 
            mountData(sockets,index,data);
        });

        socket.on('close', data => { // monitora o evento de close quando um cliente se desconecta do servidor
            const index = findIndexClient(sockets,socket); 

            if(index !== -1) sockets.splice(index, 1); // exclui a informação do socket do usuario que se desconectou no array sockets
            console.log(`CLOSED: ${socket.remoteAddress}:${socket.remotePort}`);
        });

        socket.on('error', err => { // monitora o evento de erro 
            console.error(`cliente se desconectou abruptamente ${err}`);
        });
    });
    console.log(`server: ${host}:${port}`);
}
module.exports = serverTCP; // exporta o módulo para que seja possível acessar em outro módulo 