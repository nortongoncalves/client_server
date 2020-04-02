const net = require('net'); // aqui ele pega o modulo net do node

if(process.argv.length <= 2){ // esse if verifica se foi colocado o argumento da porta
    console.error('erro: digite a porta a ser usada');
}else{
    const porta = process.argv[process.argv.length-1]; // aqui eu busco a porta
    let cliente = '';
    let server = net.createServer(socket => { // cria um server que tem um callback que retorna a conexão que chamei de socket

        socket.on('data', ress => { // inicio um event que monitora quando eu recebo dados do meu cliente
            console.log(String(ress)); // mostro no terminal o cliente e a mensagem convertendo pra string o buffer
        });

        socket.on('close', () => { // inicia um event que monitora quando é fechada a conexão com o cliente
            console.log(`o cliente se desconectou`);
        });
        
        socket.on('error', err => {
            console.error(`cliente se desconectou abruptamente ${err}`);
        });

        socket.pipe(socket); // não entendi direito oque o pipe faz mas ele meio que salva todas as funções pra executar depois 
    });

    server.listen(porta, '127.0.0.1'); // escuta a porta que foi colocada
    console.log("Servidor iniciado na porta: ", porta);
}
