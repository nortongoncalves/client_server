if(process.argv.length <= 2){ // verifica se tem o argumento da porta
    console.error('erro: digite a porta a ser usada');
}else{
    const dgram = require('dgram');
    const server = dgram.createSocket('udp4');
    const port = process.argv[process.argv.length-1];

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (msg, rinfo) => {
        console.log(`cliente: ${msg} from ${rinfo.address}:${rinfo.port}`);
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });

    server.bind(port);
}
