const net = require('net'); // importando o modulo net do node
function findIndexClient(sockets,socket) { // função que obtem a posição do usuario no array sockets
    let index = sockets.findIndex(ress => {
        return ress.remoteAddress === socket.remoteAddress && ress.remotePort === socket.remotePort;
    });
    return index;
}
function mountData(sockets,index,data) { // monta o retorno dos dados do cliente
    const { remoteAddress } = sockets[index]; // obtendo o endereço remoto dentro do array sockets[na posição do cliente]
    const { remotePort } = sockets[index]; // obtendo o endereço de porta dentro do array sockets[na posição do cliente]
    console.log(`Client [${remoteAddress}:${remotePort}]: ${String(data)}`); // mostrando os dados no console do terminal
}
function serverTCP(port,host){  // função que vai iniciar o server tcp
    const server = net.createServer({allowHalfOpen: true}); // cria o server e salva na variavel server
    let sockets = []; // definindo uma variavel sockets para armazenar os clientes conectados
    
    server.listen(port,host); // escuta na porta e host colocados na função

    server.on('connection', socket => { // monitora o evento de connection de um cliente que quando conectado executa uma função de callback
        console.log(`Client Connected => ${socket.remoteAddress}:${socket.remotePort} \n`); // retorna no console o cliente conectado
        sockets.push(socket); // coloca o socket do cliente no array de sockets

        socket.on('data', data => { // monitora o evento de data de quando o servidor recebe alguma mensagem 
            const index = findIndexClient(sockets,socket); //buscando a posição do cliente no array sockets
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
if(process.argv.length <= 2){ // verifica se tem o argumento da porta
    console.error('erro: digite a porta a ser usada');
}else{
    const port = process.argv[process.argv.length-1];
    const host = 'localhost';
    serverTCP(port,host);
}

