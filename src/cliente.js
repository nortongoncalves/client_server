const net = require('net'); // importa o modulo net do node

if(process.argv.length <= 2){ // verifica se tem o argumento da porta
    console.error('erro: digite a porta a ser usada');
}else{
    const porta = process.argv[process.argv.length-1];

    const socket = new net.Socket(); // inicia o socket 
    
    socket.connect(porta, '127.0.0.1'); // aqui estou me conectando no servidor 

    socket.on('connect', ress => { // event que monitora quando foi conectado no servidor
        socket.write('Ola eu sou o cliente'); // envia um buffer pro servidor
        setInterval(() => { // executa essa função a cada 1s e meio
            socket.write(`estou enviando`); // envia um buffer 
        }, 1500);
    });
}
