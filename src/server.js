const net = require('net');

if(process.argv.length <= 2){
    console.error('erro: digite a porta a ser usada');
}else{
    const porta = process.argv[process.argv.length-1];

    const server = net.createServer(socket => {
        socket.on('end', () => {
            console.log('cliente desconectado');
        });
        
        socket.on('error', err => {
            console.error("Erro: ", err);
        });

        socket.on('data', data => {
            console.log('received: ', data.toString());
        });

        socket.on('close', () => {
            console.log('conexao foi fechada');
        });

        socket.pipe(socket);
    });
    server.listen(porta, '127.0.0.1');
    console.log("Servidor iniciado na porta: ", porta);
}
