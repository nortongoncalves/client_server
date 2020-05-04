const net = require('net'); // importa o modulo net do node

function createConnection(porta){
    const cliente = net.createConnection({port: porta}, () => {
        console.log('conectado ao server');
    });
    return cliente;
}
if(process.argv.length <= 2) { // verifica se tem o argumento da porta
    console.error('erro: digite a porta a ser usada');
} else{
    const porta = process.argv[process.argv.length-1];
    const cliente = createConnection(porta);
    
    cliente.on('connect', ()=>{
        setInterval(() => { // executa essa função a cada 1s e meio
            cliente.write('Ola server');
            createConnection(porta);
        }, 100);
    });
    /*
    const socket = new net.Socket(); // inicia o socket 
    
    socket.connect(porta, '127.0.0.1'); // aqui estou me conectando no servidor 

    socket.on('connect', ress => { // event que monitora quando foi conectado no servidor
        socket.write('Ola eu sou o cliente'); // envia um buffer pro servidor
        setInterval(() => { // executa essa função a cada 1s e meio
            socket.write(`estou enviando`);
            initNewConection(socket,porta);
        }, 1000);
    });
*/
}
