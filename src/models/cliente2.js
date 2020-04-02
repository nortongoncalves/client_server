// esse cliente so manda 2 mensagens e se desconecta
const net = require('net');

if(process.argv.length <= 2){
    console.error('erro: digite a porta a ser usada');
}else{
    const porta = process.argv[process.argv.length-1];

    const socket = new net.Socket();
    
    socket.connect(porta, '127.0.0.1'); // aqui estou me conectando no servidor 

    socket.on('connect', ress => { // event que monitora quando foi conectado no servidor
        socket.write('Ola eu sou o cliente'); // envia um buffer pro servidor
        socket.write('cliente: estou enviando');
        socket.end();
    });
}
