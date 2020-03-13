const net = require('net');

if(process.argv.length <= 2){
    console.error('erro: digite a porta a ser usada');
}else{
    const porta = process.argv[process.argv.length-1];

    const socket = new net.Socket();
    
    socket.connect(porta, '127.0.0.1', () => {
        console.log('Conectado');
        socket.write('Ola servidor eu sou o cliente');
    });

    socket.on('close', () => {
        console.log('Connection closed');
    });

    socket.on('data', data => {
        console.log('Received: ' + data.toString());
    });

    setInterval(() => {
        socket.write('estou falando');
    }, 1500);
}
