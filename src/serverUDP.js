const fs = require('fs');
const dgram = require('dgram');

let receiveMessage = false;

function writeLog(message) {
    fs.writeFile('./src/logs/logServerUDP.txt', message,{enconding:'utf-8',flag: 'a'}, function (err) {
        if (err) console.error('erro ao escrever o log');
    });
}

function timer (){
    setTimeout(() => {
        receiveMessage = true;
        console.log('posso receber mensagens');
        setTimeout(() => {
            receiveMessage = false;
            console.log('não posso mais receber mensagens')
            timer();
        }, 5000);
    }, 20000);
}

if(process.argv.length <= 2){ // verifica se tem o argumento da porta
    console.error('erro: digite a porta a ser usada');
}else{    
    const server = dgram.createSocket('udp4');
    const port = process.argv[process.argv.length-1];

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (message, remote) => {
        if(receiveMessage){
            console.log(`client[${remote.address}][${remote.port}]: ${message}`);
        }else{
            let response = 'false';
            writeLog(`error message! client[${remote.address}][${remote.port}] | receiveMessage: ${receiveMessage} \n`);
            server.send(response, 0, response.length, remote.port, remote.address, (err, bytes) => {
                if(err) console.error('erro ao enviar a mensagem');
            });
        }
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
        timer();
    });

    server.bind(port);
}